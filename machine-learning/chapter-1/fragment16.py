# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 13:55
@FileName : fragment16.py
@Description : 
    - 汉明距离
    - 两个等长字符串 s1 和 s2 之间的汉明距离定义为将其中一个变成另一个所需要的最小替换次数
'''


from numpy import *

matV = mat([[1,1,0,1,0,1,0,0,1],[0,1,1,0,0,0,1,1,1]])
a = nonzero(matV[0] - matV[1])

'''
这里书上写的有问题
源代码为
print shape(a[0])[1]

'''
print(shape(a)[1])
print(shape(a[0])[0])


# smstr = nonzero(matV[0] - matV[1]);
# print(shape(smstr[0])[1])
# print(smstr)