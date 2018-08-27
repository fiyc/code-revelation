# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-27 16:05
@FileName : fragment7.py
@Description : 
    - Linalg线性代数库
        - 矩阵的行列式
'''
from numpy import *
A = mat([[1, 0, 0], [0, 2, 0], [0, 0, 3]])
print(linalg.det(A))

B = mat([[1,0], [0,1]])
print(linalg.det(B))
