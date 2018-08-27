# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-27 18:30
@FileName : fragment12.py
@Description : 
    - 欧式距离计算
'''

from numpy import *
vec1 = mat([1,2,3])
vec2 = mat([4,5,6])

vec = vec1 - vec2
print(sqrt(vec * vec.T))
