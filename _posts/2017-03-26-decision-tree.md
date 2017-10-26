---
layout: post
title: 决策树, Splitting Datasets one feature at a time
date: 2017-03-26 19:12:35 +0800
categories: Essays
tag: Machine Learnging
---

<img src="/assets/imgs/2017-03-26-decision-tree-intuition.png">

{:.af-figCaptionBottom}
What's a decision tree?

{:.af-sectionDivider}
决策树分类器就像带有终止块的流程图，终止块表示分类结果。开始处理数据集时，我们首先需要测量数据集合中数据的不一致性，也就是熵(*Entropy*)，然后寻找最优的特征划分数据集，直到数据集中的所有数据属于同一个分类。

{:.af-sectionDivider}
### 熵与信息增益(Entropy and Information Gain) 
#### 定义
假设两个信息源发出的字符量是一样的（使用同样的集），那么怎样衡量两个信息源发出的信息量那？我们可以先衡量信息源发出单个字符的信息量。

通常，一个信源发送出什么符号是不确定的。衡量单个字符的信息量，可以根据其出现的概率来度量。概率大，出现机会多，传达信息的不确定性小；反之不确定性就大。不确定性函数 $$f$$ 是概率 P 的**单调递降函数**，即概率越大，不确定性越小；反之亦然。

假设两个符号出现的概率是 $$p_1, p_2$$, 不确定函数为  $$ f $$ ，则两个独立符号所产生的不确定性应等于各自不确定性之和，即 $$f(p_1,p_2)=f(p_1)+f(p_1)$$
 这称为**可加性**。同时满足这两个条件的函数 $$f$$ 是对数函数，即 

$$
    f(p_i) = \log\frac1p_i = -\log{p_i}
$$ 

式中对数一般取2为底，单位为比特。

所以我们把符号 $$x_i$$ 的**信息**定义为：

$$
    l(x_i) = -\log_2{p(x_i)}
$$

其中 $$ p(x_i) $$ 是符号 $$x_i$$ 出现的概率。

这时，信源的平均不确定性应当为单个符号不确定性$$-log_2{P_i}$$的统计平均值（E），可称为**信息熵** ([香农熵, Shannon entropy](https://youtu.be/R4OlXb9aTvQ))，即

$$ 
    H = - \sum_{i=1}^n p(x_i)\log_2{p(x_i)} 
$$

而两个信息源产生的信息量的差值，称为**信息增益**。

#### 信息增益

> 信息增益是熵的减少或者是数据无序度的减少。


{:.af-sectionDivider}
### 构造决策树
以提供的简单海洋生物数据来构造下决策树，数据集有两个特征：

1. no surfacing; 
2. flippers;

Order| No Surfacing| flippers | fish
---|---|---|---|
 1| 1 | 1| y
 2| 1 | 1| y
 3| 1 | 0| n
 4| 0 | 1| n
 5| 0 | 1| n
 
#### 1. 计算香农熵(熵越高，则混合的数据也就越多)

$$
\begin{aligned}
 H & = -p(x_y) * \log_2{p(x_y)}   -p(x_n) * \log_2{p(x_n)}
   \\ & = -(\frac{2}{5} *  log_2{\frac{2}{5}}) - -(\frac{3}{5} *  log_2{\frac{3}{5}})
   \\ &\approx 0.5288 + 0.4422 \\ &= 0.971
\end{aligned}
 $$
 
#### 2. 按照获取最大信息增益的方法划分数据集(第一轮)
分别根据不同的特征来确定数据集的划分，用最大信息增益的特征来划分。
1. 以 no-surfacing 特征来尝试分类：
```
    feature = 'no surfacing',    value = 1 : [1, y], [1, y], [0, n]
                                 value = 0 : [1, no], [1, no]
```
则新的熵为 $$h_1$$ 与信息增益 $$g_1$$：
\begin{align}
h_1 &= \frac{3}{5}* (-\frac{2}{3} * \log_2{\frac{2}{3}}  -\frac{1}{3} * \log_2{\frac{1}{3}}) + \frac{2}{5} * (-\log_2{1})
\\ &\approx \frac{3}{5} * (0.39 + 0.528) \\ &= 0.5508
\\ \\ g_1 &= H - h_1 = 0.971 - 0.5508 = 0.4202
\end{align}

2. 以 flippers 第二个特征来尝试分类：
```
    feature = 'flippers',       value = 1: [1, y], [1,y], [0, n], [0, n]
                                value = 0: [1, no]
```
则新的熵为 $$h_2$$ 与信息增益 $$g_2$$:
\begin{align}
h_2 &= \frac{4}{5}(-\frac{1}{2} * \log_2{\frac{1}{2}} - \frac{1}{2} * \log_2{\frac{1}{2}}) + \frac{1}{5}(-\log_2{1})
\\ & = 0.8 
\\ \\ g_2 &= H - h_2 = 0.971 - 0.8 = 0.170951
\end{align}

根据最大的信息增益来划分数据集，即根据第一个特征来划分：
<img src="./decisionTrees01.svg" />
 

#### 2. 递归按照获取最大信息增益的方法划分数据集(第二轮)¶
即对还需要划分的子树进行划分，待划分的子树就只有右子树了。
其基本熵为：
\begin{align}
H = - \frac{2}{3} * log_2{\frac{2}{3}} - \frac{1}{3} * log_2{\frac{1}{3}} \approx 0.6365
\end{align}
该子树就只有一个特征值 flippers 了, 根据 flippers 来进行划分。
```
    features = flippers, value = 1: [1, y], [1, y]
                         value = 0: [0, n]
```
新的划分熵 $$h_1$$ 及信息增益 $$g_1$$:
\begin{align}
h_1 &= \frac{2}{3} * (-log_2{1}) + \frac{1}{3} * (-log_2{1}) = 0
\\ g_1 & = 0.6365 - 0 = 0.6365
\end{align}
无更多信息增益，可以直接划分。

#### 递归结束的条件
决策树递归结束的条件是：程序遍历完所有划分数据集的属性，或者每个分支下的所有实例都具有相同的类。

#### 最终生成的决策树
<img src="./decisionTrees.svg" />

#### 其它

如果数据集已经处理了所有属性，但是类标签依然不是惟一，即叶子节点还是可以再分的，此时我们需要决定如何定义该叶子节点，在这种情况下通常会采用多数表决的方法决定该叶子节点的分类。

后继还会介绍其它决策树算法，如 C4.5 和 CART，这些算法并不总是在每次划分分组时都会消耗特征。


### 算法实现


```python
'''
决策树算法实现
'''
from numpy import *
from math import log
import operator


# 计算香农熵
def calcShannonEntropy(dataSet):
    numEntries = len(dataSet)
    labelCounts = {}
    for vec in dataSet:
        label = vec[-1]
        labelCounts[label] = labelCounts.get(label, 0) + 1
    
    shannonEntropy = 0.0
    for label in labelCounts:
        probability = float(labelCounts[label]) / numEntries
        shannonEntropy -= probability * log(probability, 2)
    return shannonEntropy

# 根据特征划分数据集
def splitDataSet(dataSet, fAxis, value):
    retDat = []
    for vec in dataSet:
        if vec[fAxis] == value:
            tmp = vec.copy() # 等价于 tmp = vec[:fAxis].extend(vec[fAxis+1:])
            del tmp[fAxis]
            retDat.append(tmp)
    return retDat

# 选择最优的数据集划分特征
def chooseBestFeature(dataSet):
    numDs = float(len(dataSet))
    numFeatures = len(dataSet[0]) - 1
    baseEntropy = calcShannonEntropy(dataSet)
    bestInfoGain = 0.0; bestFeature = -1
    for i in range(numFeatures):
        values = [example[i] for example in dataSet]
        valuesSet = set(values)
        newEntropy = 0.0
        for v in valuesSet:
            subDataV = splitDataSet(dataSet, i, v)
            prop = float(len(subDataV)) / numDs
            newEntropy += prop * calcShannonEntropy(subDataV)
            
        infoGain = baseEntropy - newEntropy
        print ('feature ', i, 'infoGain: ', infoGain)
        if infoGain >= bestInfoGain:
            bestFeature = i
            bestInfoGain = infoGain
    return bestFeature

# 对于未能完全划分的叶子节点根据投票来获取分类
def cleafMajorityCount(leafList):
    labelCount = {}
    for vote in leafList:
        labelCount[vote] = labelCount.get(vote, 0) + 1
    sortedCount = sorted(labelCount.items(), key = operator.itemgetter(1), reverse = True)
    return sortedCount[0][0]

# 递归创建决策树
def createDecisionTree(dataSet, labels):
    classList = [example[-1]  for example in dataSet]
    # 如果类别完全相同则停止继续划分
    if classList.count(classList[0]) == len(classList):
        return classList[0]
    # 如果没有特征可用时，用投票算法来完成分类。
    if len(dataSet[0]) == 1:
        return cleafMajorityCount(classList)
    
    bestFeature = chooseBestFeature(dataSet)
    bestFeatureLabel = labels[bestFeature]
    myTree = {bestFeatureLabel: {}}
    del labels[bestFeature]
    values = [example[bestFeature] for example in dataSet]
    valuesSet = set(values)
    for value in valuesSet:
        subLabels = labels[:]
        myTree[bestFeatureLabel][value] = createDecisionTree(splitDataSet(dataSet, bestFeature, value), subLabels)
    return myTree
    
            
# 创建数据集
def createDataSet():
    dataSet = [
        [1, 1, 'yes'],
        [1, 1, 'yes'],
        [1, 0, 'no'],
        [0, 1, 'no'],
        [0, 1, 'no']
    ]
    labels = ['no surfacing', 'flippers']
    return dataSet, labels
```


```python
import copy

# 熵函数测试
myDat, labels = createDataSet()
print (myDat)
print ('Initial Shannon Entropy: ', calcShannonEntropy(myDat), '\n')
'''
熵越高，则混合的数据也就越多，我们可以在数据集增加新的分类，观察熵的变化，这里增加一个新的 'maybe' 分类。
'''
testDat = copy.deepcopy(myDat)
testDat[0][-1] = 'maybe'
print (testDat)
print ('Add another label', calcShannonEntropy(testDat))

```

    [[1, 1, 'yes'], [1, 1, 'yes'], [1, 0, 'no'], [0, 1, 'no'], [0, 1, 'no']]
    Initial Shannon Entropy:  0.9709505944546686 
    
    [[1, 1, 'maybe'], [1, 1, 'yes'], [1, 0, 'no'], [0, 1, 'no'], [0, 1, 'no']]
    Add another label 1.3709505944546687



```python
# 测试根据特征划分数据集函数 
print ('Split by feature 0(no surfacing)')
print(splitDataSet(myDat, 0, 0), '\t', splitDataSet(myDat, 0, 1))
print ('Split by feature 1(flippers)')
print(splitDataSet(myDat, 1, 0), '\t', splitDataSet(myDat, 1, 1))
```

    Split by feature 0(no surfacing)
    [[1, 'no'], [1, 'no']] 	 [[1, 'yes'], [1, 'yes'], [0, 'no']]
    Split by feature 1(flippers)
    [[1, 'no']] 	 [[1, 'yes'], [1, 'yes'], [0, 'no'], [0, 'no']]



```python
# 测试选择最优的划分特征
print (myDat)
print ('Initial Choose:', chooseBestFeature(myDat), '\n')
print (splitDataSet(myDat, 0, 0))
print ('Another Choose:',chooseBestFeature(splitDataSet(myDat, 0, 0)))
```

    [[1, 1, 'yes'], [1, 1, 'yes'], [1, 0, 'no'], [0, 1, 'no'], [0, 1, 'no']]
    feature  0 infoGain:  0.4199730940219749
    feature  1 infoGain:  0.17095059445466854
    Initial Choose: 0 
    
    [[1, 'no'], [1, 'no']]
    feature  0 infoGain:  0.0
    Another Choose: 0



```python
# test cleafMajorityCount
cleafMajorityCount(['y','y','n'])
```




    'y'




```python
# 获取最终的决策树
myDat, labels = [[1, 'yes'], [1, 'yes'], [0, 'no']], ['flippers']
print (myDat, labels)
print (createDecisionTree(myDat, labels))
print ()
myDat, labels = [[1, 'yes'], [1, 'yes']], ['flippers']
print (myDat, labels)
print (createDecisionTree(myDat, labels))
print ()
myDat, labels = createDataSet()
createDecisionTree(myDat, labels)

```

    [[1, 'yes'], [1, 'yes'], [0, 'no']] ['flippers']
    feature  0 infoGain:  0.9182958340544896
    {'flippers': {0: 'no', 1: 'yes'}}
    
    [[1, 'yes'], [1, 'yes']] ['flippers']
    yes
    
    feature  0 infoGain:  0.4199730940219749
    feature  1 infoGain:  0.17095059445466854
    feature  0 infoGain:  0.9182958340544896





    {'no surfacing': {0: 'no', 1: {'flippers': {0: 'no', 1: 'yes'}}}}



### 使用 Matplotlib 绘制决策树
```javascript
// 获取树的深度 js 版实现
var tree = {'no surfacing': {0: 'no', 1: {'flippers': {0: 'no', 1: 'yes'}}}}
var getTreeDepth = function(tree){
  if (tree && typeof tree == 'object' &&  Object.keys(tree).length > 0) {
    var keys = Object.keys(tree)
    var subTree = tree[keys[0]]
    var subKeys = Object.keys(subTree)
    var leftDepth = 1 +  getTreeDepth(subTree[subKeys[0]])
    var rightDepth = 1 +  getTreeDepth(subTree[subKeys[1]])
    return leftDepth > rightDepth ? leftDepth : rightDepth
  }
  return 0
}
getTreeDepth(tree)
```


```python
'''
绘制决策树
'''
import matplotlib.pyplot as plt

# 获取树的深度
def getTreeDepth(tree):
    if tree == None or (not isinstance(tree, dict)) or len(tree.keys()) == 0:
        return 0
    subTreeKey = list(tree)[0]
    subTree = tree[subTreeKey]
    subTreeKeys = subTree.keys()
    maxSubTreeDepth = 0
    for subKey in subTreeKeys:
        depth = getTreeDepth(subTree[subKey])
        if depth >= maxSubTreeDepth:
            maxSubTreeDepth = depth
    return 1 + maxSubTreeDepth

# 获取树的最大宽度，即叶子节点个数。
def getTreeWidth(tree):
    if tree == None:
        return 0
    if isinstance(tree, str):
        return 1
    keys = list(tree.keys())
    subTree = tree[keys[0]]
    subTreeKeys = list(subTree)
    numLeaves = 0
    for subKey in subTreeKeys:
        numLeaves += getTreeWidth(subTree[subKey])
    return numLeaves

# 判断是否是叶子节点
def isLeaf(node):
    return isinstance(node, dict) and len(node.keys()) == 1 and isinstance(node[list(node)[0]], str)

# 获取树的根节点位置
def getRootPos(tree, xStartPos = 0):
    width = getTreeWidth(tree)
    height = getTreeDepth(tree)
    return (width - 1) * 4 + xStartPos, height * 2

# 绘制树的节点
def plotTreeNodes(tree, xStartPos = 0):
    if isLeaf(tree):
        print(xStartPos + 2, 2)
        return
    xPos, yPos = getRootPos(tree)
    keys = list(tree.keys())
    rootTree = tree[keys[0]]
    subKeys = list(rootTree)
    xStartPos = 0
    for subKey in subKeys:
        print ('subTree:', rootTree, subKey)
        subTree = rootTree[subKey]
        plotTreeNodes(subTree, xStartPos)
        xStartPos, y = getRootPos(subTree)
    print (xPos, yPos)

```


```python
tree1 = {'no surfacing': {0: 'no', 1: {'flippers': {0: {'flippers': {0: 'no', 1: 'yes'}}, 1: 'yes'}}}}
tree2 = {'no surfacing': {0: 'no', 1: {'flippers': {0: 'no', 1: 'yes'}}}}
tree3 = {'no surfacing': {0: 'no', 1: 'no', 2: 'yes'}}
print(getTreeDepth(tree1), getTreeDepth(tree2), getTreeDepth(tree3))
print(getTreeWidth(tree1), getTreeWidth(tree2), getTreeWidth(tree3))
print(isLeaf({0: 'yes'}), isLeaf(tree3))
print(getRootPos(tree1), getRootPos(tree2), getRootPos(tree3))
print ('Plot tree')
plotTreeNodes(tree1)
```

    3 2 1
    4 3 3
    True False
    (12, 6) (8, 4) (8, 2)
    Plot tree
    subTree: {0: 'no', 1: {'flippers': {0: {'flippers': {0: 'no', 1: 'yes'}}, 1: 'yes'}}} 0



    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    <ipython-input-3-c7f556c6fbba> in <module>()
          7 print(getRootPos(tree1), getRootPos(tree2), getRootPos(tree3))
          8 print ('Plot tree')
    ----> 9 plotTreeNodes(tree1)
    

    <ipython-input-2-ae66559e1319> in plotTreeNodes(tree, xStartPos)
         55         print ('subTree:', rootTree, subKey)
         56         subTree = rootTree[subKey]
    ---> 57         plotTreeNodes(subTree, xStartPos)
         58         xStartPos, y = getRootPos(subTree)
         59     print (xPos, yPos)


    <ipython-input-2-ae66559e1319> in plotTreeNodes(tree, xStartPos)
         48         return
         49     xPos, yPos = getRootPos(tree)
    ---> 50     keys = list(tree.keys())
         51     rootTree = tree[keys[0]]
         52     subKeys = list(rootTree)


    AttributeError: 'str' object has no attribute 'keys'

