---
layout: post
title: Numpy 矩阵与数组
date: 2017-02-08 19:12:35 +0800
categories: ABC
tag: code
---

### 区别和相同点
Numpy matrices 是严格二维的 strickly 2-dimensional. 而 Numpy Array(ndarrays) 是 N-维的。
Matrices 是 ndarray 的子类，所以它们继承了 ndarray 的所有的属性和方法。

### Matrices 的优势。
1. 可以提供矩阵的内积。即 如 A, B 是两个矩阵， 则 A * B 是它们的内积。
2. 矩阵提供 .T(转置), .H(共轭转置), .I(逆) 这些便捷运算，而 数组只有 .T(转置)这一个项。

### Ndarray 的优势
1. 数组遵循以元素为单位规则运算。
   如： 如 `A, B `是数组， 则 ` A * B` 是对就元素 ( Elementwise)相乘.

````

   c=np.array([[4, 3], [2, 1]])
   d=np.array([[1, 2], [3, 4]])
   print(c*d)
   
   [[4 6]
    [6 4]] 

 ```

 如果想计算矩阵内积可以用 np.dot 函数来完成。

```

  print(np.doct( c, d))
    [[13 20]
     [ 5  8]]
```


2. 对于 ** 运算，矩阵是按内积的形式来计算，而数组还是按对应元素来计算。

关于矩阵与数组之间的转换，用 `np.asarray()` <--> `np.asmatrix()` 互转, `A.getA()` 可以返回矩阵对应的数组。

