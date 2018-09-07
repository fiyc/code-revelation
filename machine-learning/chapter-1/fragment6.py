# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-24 16:47
@FileName : fragment6.py
@Description : 
    - 矩阵的其他操作
    - 行列数
    - 切片
    - 赋值
    - 比较
'''

from numpy import *

## 矩阵的行列数
myMatrix = mat([[1,2,3], [4,5,6], [7,8,9]])
print(shape(myMatrix))


## 矩阵的按行切片
myScl1 = myMatrix[0]
print(myScl1)

## 矩阵的按列切片
myScl2 = myMatrix.T[0]
print(myScl2)

## 矩阵的复制
myCpmat = myMatrix.copy()
print(myCpmat)

print(myMatrix < myMatrix.T)
