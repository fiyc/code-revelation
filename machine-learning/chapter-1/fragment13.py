# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 11:18
@FileName : fragment13.py
@Description : 
    - 曼哈顿距离
    - 只能水平移动或者垂直移动
'''

from numpy import *
vec1 = mat([1,2,3])
vec2 = mat([4,5,6])

distance = sum(abs(vec1 - vec2))
print(distance)