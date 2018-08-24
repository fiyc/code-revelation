# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-24 11:23
@FileName : fragment1.py
@Description : 
    - numpy矢量化编程例子
'''

import numpy as np

mylist = [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]
a = 10
mymatrix = np.mat(mylist)
print(a * mymatrix)
print(a + mymatrix)
print(mymatrix - a)