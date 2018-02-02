---
layout: post
title: 一个简单的 Makefile 指引
date: 2015-03-18 19:12:35 +0800
categories: Essays
tag: C, C++, makefile
---
<img src="/assets/imgs/2015-03-18-makefile.png">

用 Makefile 来管理代码的编译非常简单快捷。这份指引希望可以帮助你管理中小项目的编译。

{:.af-sectionDivider}
## 例子

假设项目有三个文件: `main.c, say.c,say.h ` 这是一个典型的结构，一个主程序文件，一些类库函数文件和一个 include 头文件。

文件 `main.c`

```c
#include <say.h>

int main () {
  // call a function in anther file.
  sayHello();
  return 0;
}
```

文件 `say.h`

```c
/* exmaple include files */
void sayHello(void);
```

文件 `say.c`

```c
#include <stdio.h>
#include <say.h>

void sayHello (void) {
    printf("Hello makefile!\n");
    return;
}
```

现在可以执行下面的命令来编译代码集：

```bash
 gcc -o out.o say.c main.c -I. 
```

`gcc` 将两个 `.c` 文件编译成可执行文件 `out.o`。选项 `-I.`  告诉 `gcc` 在当前文件夹中寻找头文件 `say.h`。在没有 makefile 的情况下，项目的编译、修改、调试需要在终端中来回输入命令来执行，特别当你增加 `.c` 文件时还需要更新命令。

所以，命令行有两个问题： 

1. 每次都需要重新输入命令。
2. 如果你只是改变了其中一个 `.c` 文件，命令行重新编译时需要编译所有文件是非常耗时的。

所以我们需要用一个 `makefile` 来解决这个问题。

### Makefile 1

编写一个文件名为 `Makefile` 或 `makefile` 的文件，内容如下：

```makefile
hellomake: main.c say.c
    gcc -o say.1.o main.c say.c -I.
```

在命令行中执行 `make` 命令，将执行 `makefile` 中的 `gcc -o say.o main.c say.c -I.` 命令。

```bash
$ make 
gcc -o say.1.o main.c say.c -I.
$ ./say.1.o
Hello makefile!
```

当 `make`不指定参数时，会默认读取 `makefile` 或 `Makefile` 并执行文件中的第一个规则，`:` 后面所跟的文件是命令所依赖的文件。我们就解决了第一个缺点。还是没有解决第二个问题。

**注意：** 在 `gcc` 命令前有一个 `tab`，任何命令都要以 `tab` 开始，否则 make 可能会罢工。 Makefile 有一般格式：

```
# comment 注释
target: prerequisites
    command
```

规则的 `:` 左侧称为 target,  `:` 的右侧称为 `prerequisites `.

### Makefile 2

编写文件 `2.Makefile`， 内容如下：

```makefile
CC=gcc
CFLAGS=-I.

hellomake: main.o say.o
    $(CC) -o say.2.o main.o say.o $(CFLAGS)
```

在执行 `make` 命令时指定文件，

```bash
$ make -f 2.Makefile 
gcc -I.   -c -o main.o main.c
gcc -I.   -c -o say.o say.c
gcc -o say.2.o main.o say.o -I.
$ ./say.2.o  
Hello makefile!
```

我们在这个 makefile 中定义了 `CC, CFLAGS` 两个（临时）常量。这两个常量告诉 make 命令怎样去编译 `main.c, say.c` 文件。一般，CC 代表 C 编译器，而 CFLAGS 用于传递选项。在规则后的依赖 `main.o,say.o`文件是告诉 make 命令先将 `.c` 文件分别编译成 object 文件，然后再生成加执行文件 `say.2.o`

在一些小的项目中这个 makefile 足够了，但是有点需要注意：当你变更了 `say.h` 头文件，make 并不会重新编译 `.c` 源文件，很明显我们需要重新编译源文件的。为了解决这一点，我们需要让 `make` 命令知道所有 `.c` 源文件是依赖某些 `.h` 文件的。我们需要重新改一下 Makefile.

### Makefile 3

编写第三个 Makefiel, `3.Makefile`。

```makefile
CC=GCC
CFLAGS=-I.
DEPS = say.h

%.o: %.c $(DEPS)
    $(CC) -o $@ $< $(CFLAGS)
hellomake: main.o say.o
    gcc -o say.3.o main.o say.o -I.
```

执行命令：

```bash
$ make -f 3.Makefile   
gcc -c -o main.o main.c -I.
gcc -c -o say.o say.c -I.
gcc -o say.3.o main.o say.o -I.
```

在这个文件中，我们又添加了 `DEPS` 常量来指代 `.c` 源文件的依赖。然后定义一条通配规则： `%.o: %.c $(DEPS)` 说明 Object 文件依赖于 `.c`源文件，并且依赖于  `DEPS` 常量。make 执行紧接在后面的命令，`-c` 说明生成 object 文件；`-o -$@` 表示用规则 `:` 左侧的字符作为作为 object 对像的文件名; `$<` 则是规则 `:` 右侧依赖的第一项。

在通配规则中我们使用了 make 自动注入的自动变量，一些常用的[自动变量(automatic vaiables)](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)，用到时候可以查阅。

-  `$@` ：target 
- `$<`: prerequisites 的第一项。
- `$^`: 所有的 prerequisites 项，用空格分隔。

$ 后面可跟的字符是 `@, %, <, ^,?, +, |, *`, 另外的变形就是可以跟 `D, F` 字母可以指定文件夹和文件名。

### Makefile 4

我们还可以把所有的 object 文件定义在 `OBJ` 宏里。并用 `$^` 变量。新的 Makefile 如下：

```makefile
CC=gcc
CFLAGS=-I.
DEPS = say.h
OBJ = main.o say.o

%.o: %.c $(DEPS)
    $(CC) -c -o $@ $< $(CFLAGS)

hellomake: $(OBJ)
    gcc -o say.4.o $^ $(CFLAGS)
```

执行：

```bash
$ make -f 4.Makefile  
gcc -c -o main.o main.c -I.
gcc -c -o say.o say.c -I.
gcc -o say.4.o main.o say.o -I.
$ ./say.4.o
Hello makefile!
```

### Makefile 5

最后，如果你想把我们 `.h` 文件统一放在 `include` 文件夹下，我们的源文件放在 `src` 文件夹中，一些本地的库文件放在 `lib` 文件夹中。另外，我们还想处理的这些隐藏的 `*.o` 文件。下面这个 Makefile 会定义 `include, lib` 路径，并且把 object 文件放在 `src/obj` 子目录下。 而且，它还可以定义任意你想引入的库，如 `include <math.h> ` 时需要[指定 `-lm`. ]()

这个 Makefile 应该放在 `src` 目录中。

注意，我们还定义了一个 clean 规则，用来清理 object 文件。`.PHONY: clean`  规则是阻止 make 命令执行 `clean`。

Makefile 内容如下：

```makefile
IDIR=../include
CC=gcc
CFLAGS=-I$(IDIR)

ODIR=obj
LDIR=../lib

LIBS=-lm

_DEPS = say.h
DEPS = $(pathsubst %, $(IDIR)/%, $(_DEPS))

_OBJ = main.o say.o
OBJ = $(pathsubst %, $(ODIR)/%, $(_OBJ))

$(ODIR)/%.o: %.c $(DEPS)
    $(CC) -c -o $@ $< $(CFLAGS)

hellomake: $(OBJ)
    gcc -o $@ $^ $(CFLAGS) $(LIBS)

.PHONY: clean

clean:
    rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~
```

现在你就拥有一个完美的 Makefile 了，可以来管理你的中小项目了。更多的信息请参考：[GUN Make Manual](https://www.gnu.org/software/make/manual/make.html)

### 参考：

1. [A Simple Makefile Tutorial](http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/)
2. 关于 `-lm` 的问题是历史问题，参考 [Why do you need an explicit `-lm` compiler option ](https://stackoverflow.com/questions/10371647/why-do-you-need-an-explicit-lm-compiler-option) 和 [gcc: why the -lm flag is needed to link the math library? ](https://stackoverflow.com/questions/4606301/gcc-why-the-lm-flag-is-needed-to-link-the-math-library)
3. [Github demo](https://github.com/AaronFlower/cplusplus/tree/master/makefile-tutorial/00-hello)
4. 延伸 [CMake Tutorial](http://www.hahack.com/codes/cmake/)