# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-03 15:43
@FileName : fragment1.py
@Description : 
    - 消元法求原方程组的解
'''
from numpy import *

A = mat([[8, -3, 2], [4, 11, -1], [6, 3, 12]])
B = mat([20, 33, 36])

result = linalg.solve(A, B.T)
print(result)