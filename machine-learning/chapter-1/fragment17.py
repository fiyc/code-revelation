# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 14:17
@FileName : fragment17.py
@Description : 
    - 杰拉德相似系数
        - 两个集合A和B的交集元素在A B的并集中所占的比例
    - 杰拉德距离
        - 两个集合A和B的不同元素在A B的并集中所占的比例
'''

from numpy import *
import scipy.spatial.distance as dist

matV = mat([[1,1,0,1,0,1,0,0,1], 
            [0,1,1,0,0,0,1,1,1]])

print(dist.pdist(matV, 'jaccard'))
