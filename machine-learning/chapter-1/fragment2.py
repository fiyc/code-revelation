# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-24 11:29
@FileName : fragment2.py
@Description : 
    - 理解数学公式与numpy矩阵运算
    - 矩阵的初始化
        - 1. 创建一个 3*5 的全0矩阵和全1矩阵
        - 2. 生成随机矩阵
        - 3. 单位阵
'''
import numpy as np

# 矩阵的初始化
## 1. 创建一个 3*5 的全0矩阵和全1矩阵
myZero = np.zeros([3, 5])
print(myZero)

myOnes = np.ones([3, 5])
print(myOnes)

## 2. 生成随机矩阵
myRand = np.random.rand(3, 4)
print(myRand)

## 3. 单位阵
myEye = np.eye(4, 5)
print(myEye)

