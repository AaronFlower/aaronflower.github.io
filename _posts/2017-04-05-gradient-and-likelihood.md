---
layout: post
title:  线性回归--相关数学知识点
date:   2017-04-05 19:12:35 +0800
categories: Essays
tag: Machine Learnging
---
### 1. 梯度(Gradient)

{:.af-sectionDivider}
#### 1.1 定义

梯度是连续函数中的一个概念。以二元函数为例，假设 $$f(x, y)$$ 在平面区域 $$D$$ 内有一阶连续偏导数，则对于 $$ \forall  P(x_0, y_0) \in D $$, 都可以给出一个向量：

$$ f_x(x_0, y_0) \mathbf{i} + f_y(x_0, y_0) \mathbf{j} $$

则这个向量称为函数在 $$ P(x_0, y_0)$$ 的**梯度**，记作 $$\mathbf{grad} f(x_0, y_0)$$ 或 $$\triangledown f(x_0, y_0)$$, 即： 

$$
\begin{aligned}
\mathbf{grad} f(x_0, y_0) = \triangledown f(x_0, y_0) = f_x(x_0, y_0) \mathbf{i} + f_y(x_0, y_0) \mathbf{j}
\end{aligned}
$$

{:.af-sectionDivider}
#### 1.2 梯度与方向导数

方向导数有一个定理是： 如果函数 $$f(x, y)$$ 在点 $$P(x_0, y_0)$$ 可微分，那么函数在该点沿任一方向 $$l$$ 的方向导数存在，且

$$
\frac{\partial{f}}{\partial{l}} \Biggr\rvert _{(x_0, y_0)} = f_x(x_0, y_0) \cos{\alpha} + f_y(x_0, y_0) \cos{\beta}
$$

其中，$$\cos{\alpha}, \cos{\beta}$$ 是方向 $$l$$ 的方向余弦。

如果函数 $$f(x, y)$$ 在点 $$P(x_0, y_0)$$ 可微分, $$\mathbf{e}_{l} = (\cos{\alpha}, \cos{\beta})$$ 是与方向 $$l$$ 同向的单位向量，
则有**方向导数与梯度的关系**为：

$$
\begin{aligned}
\frac{\partial{f}}{\partial{l}} \Biggr\rvert _{(x_0, y_0)} &= f_x(x_0, y_0) \cos{\alpha} + f_y(x_0, y_0) \cos{\beta}
\\ &= \mathbf{grad}f(x_0, y_0) \cdot \mathbf{e}_{l}
\\ &= \bigr\rvert \mathbf{grad}f(x_0, y_0) \bigr\rvert \cdot \cos{\theta}
\end{aligned}
$$

其中 $$\theta $$ 是 $$\mathbf{grad}f(x_0, y_0)$$ 与 $$ \mathbf{e}_{l} $$ 夹角。上式利用的是内积公式： $$ \vec{a} \cdot \vec{b} = \rvert\vec{a}\rvert\rvert\vec{b}\cos{\lt\widehat{\vec{a},\vec{b}}\gt} $$

这一关系式表明了函数在一点的梯度与函数在这一点的方向导数间的关系。
特别地，
1. 当 $$\theta = 0$$ 时，$$ \cos{\theta} = 1$$, 梯度向量与方向导数向量**同向**，函数可以在这个方向的方向导数增加最快，可以达到函数的最大值。
2. 当 $$\theta = 180$$ 时，$$ \cos{\theta} = -1$$, 梯度向量与方向导数向量**反向**，函数可以在这个方向的方向导数减少最快，可以达到函数的最小值。

所在工程上在求函数的最大值时，用梯度上升算法；而求函数最小值时，用梯度下降算法。


### 2. 总体，样本，极大似然估计

{:.af-sectionDivider}
#### 2.1 总体与样本

**总体** $$X$$ , 即是我们研究问题所涉及到的对象的全体。

**样本** $$X_1, X_2, ... X_n, ...$$ , 是从总体随机抽取的一些样品。

**样本的二重性：** , 样本即是数，又是随机变量。

当样本  $$X_1, X_2, ... X_n, ...$$ 看成随机变量时，是相互独立且同分布的 （Independent and Indentically Distribued, IID） 并且与 总体 $$X$$ 的分布相同。

假设  $$X$$ 的概率密度是 $$f(x)$$, 则 $$X_1, X_2, ... X_n$$ 与 $$ X $$ IID, 有其联合概率密度函数：

$$
    g(x_1, x_2, ..., x_n) = \prod_{i=1}^{n} f(x_i)
$$

{:.af-sectionDivider}
#### 2.2 极大似然估计

设总体分布为 $$f(x,\space \theta_1, ..., \theta_k)$$,  $$X_1, X_2, ... X_n$$ 为从该总体抽出的样本， 因为  $$X_1, X_2, ... X_n $$ IID, 所以它们的联合概率密度函数为：

$$
L(x_1, x_2, ..., x_n;\space \theta_1, ..., \theta_k) = \prod_{i=1}^{n} f(x_i,\space \theta_1, ..., \theta_k)
$$

我们把 $$x_1, x_2, ..., x_n$$ 看成固定的， 则 $$L(x_1, x_2, ..., x_n;\space \theta_1, ..., \theta_k)$$ 就是 $$\theta_1, ..., \theta_k $$ 的函数，这时我们称之为似然函数。

对 $$\theta$$ 的极大似然估计就归结为示 $$L(\theta)$$ 的最大值点。 一般极大依然函数都 log 来处理一下方便计算。
在 Logistic 回归中用到这个方法，求最大值点，当然要用梯度上升算法了。