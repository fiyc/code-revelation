# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-27 18:06
@FileName : fragment10.py
@Description : 
    - Linalg线性代数库
        - 矩阵的秩
'''

from numpy import *

# A = mat([[1,2,4,5,7], [9,12,11,8,2], [6,4,3,2,1],[9,1,3,4,5],[0,2,3,4,1]])
A = mat([[1,2,4,5,7], [9,12,11,8,2], [6,4,3,2,1],[9,1,3,4,5]])
print(linalg.matrix_rank(A))