# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 17:32
@FileName : fragment19.py
@Description : 
    - 标准化欧式距离
'''

from numpy import *

vect = mat([[100,2,3000], [400,5,6000]])
print(vect)
v12 = vect[0] - vect[1]

# print(sqrt(v12 * v12.T))

#norm
print(vect.T)
varmat = std(vect.T, axis = 0, ddof=1)
print(varmat)
normvmat = (vect - mean(vect)) / varmat.T
print(normvmat)
normv12 = normvmat[0] - normvmat[1]
# print(sqrt(normv12 * normv12.T))