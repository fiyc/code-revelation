# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 16:50
@FileName : fragment18.py
@Description : 
    - 特征值和特征向量
'''

from numpy import *
A = mat([[8,1,6], [3,5,7], [4,9,2], [5,6,7]])
evals, evecs = linalg.eig(A)
print(evals)
print(evecs)