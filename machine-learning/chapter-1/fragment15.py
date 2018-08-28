# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 13:39
@FileName : fragment15.py
@Description : 
    - 夹角余弦
'''
from numpy import *

vec1 = mat([1,2,3])
vec2 = mat([4,7,5])
dotValue = vec1 * vec2.T

cosValue = dotValue / (linalg.norm(vec1) * linalg.norm(vec2))
print(cosValue)