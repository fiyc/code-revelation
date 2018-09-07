# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-24 11:39
@FileName : fragment3.py
@Description : 
    - 理解数学公式与numpy矩阵运算
    - 矩阵的元素运算
        - 1. 元素相加和相减
        - 2. 矩阵数乘
        - 3. 矩阵所有元素求和
        - 4. 矩阵各元素的积
        - 5. 矩阵各元素的n次幂
'''

from numpy import *

# 1. 元素相加和相减 条件: 矩阵的行数和列数必须相同
myOnes = ones([3, 4])
myEyes = eye(3, 4)
print(myOnes + myEyes)
print(myOnes - myEyes)

# 2. 矩阵的数乘: 一个数乘以一个矩阵
myMatrix = mat([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
a = 10
print(a * myMatrix)

# 3. 矩阵所有元素求和
print(sum(myMatrix))

# 4. 矩阵各元素的积
myMatrix2 = 1.5 * ones([3, 3])
print(multiply(myMatrix, myMatrix2))

# 5. 矩阵各元素的n次幂
print(power(myMatrix, 3))