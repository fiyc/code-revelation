# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 13:35
@FileName : fragment14.py
@Description : 
    - 切比雪夫距离
    - 周围八格运动
'''

from numpy import *
vec1 = mat([1,2,3])
vec2 = mat([4,7,5])

distance = abs(vec1 - vec2).max()
print(distance)