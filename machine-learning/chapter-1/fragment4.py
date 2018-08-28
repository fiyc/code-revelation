# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-24 15:42
@FileName : fragment4.py
@Description : 
    - 矩阵的乘法: 矩阵乘矩阵
    - 矩阵乘矩阵的理解
    下面两个线性方程组
    2x + y = 3
    4x + 3y = 7

    转化为矩阵

    2  1         x       3
            *        =   
    4  3         y       7

    两个矩阵分别为
    [[2, 1], [4, 3]]
    [[x], [y]]
'''

from numpy import *

myMatrix = mat([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
myMatrix2 = mat([[1], [2], [3]])

mat1 = mat([1,2])
mat2 = mat([[1,3], [3,1]])
print(mat2 * mat1.T)

# print(myMatrix * myMatrix2)