# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-27 17:36
@FileName : fragment8.py
@Description : 
    - Linalg线性代数库
        - 矩阵的逆

        逆矩阵：在线性代数中，给定一个n阶方阵 A若存在一n阶方阵 B ，使得 AB = I ，其中 I为n阶单位矩阵，则称 A是可逆的，且 B 是 A 的逆矩阵。
'''

from numpy import *

A = mat([[1,2,4,5,7], [9,12,11,8,2], [6,4,3,2,1],[9,1,3,4,5],[0,2,3,4,1]])
print(linalg.inv(A))
