# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-27 18:19
@FileName : fragment11.py
@Description : 
    - Linalg线性代数库
        - 可逆矩阵的求解
'''

from numpy import *

A = mat([[1,2,4,5,7], [9,12,11,8,2], [6,4,3,2,1],[9,1,3,4,5],[0,2,3,4,1]])
b = mat([1, 0, 1, 0, 1])
S = linalg.solve(A, b.T)
print(S)