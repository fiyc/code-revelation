# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-24 10:44
@FileName : mytest1.py
@Description : 
    - 机器学习第一个例子
    - 校验环境安装成功


问题描述
1. 报错 ValueError: Masked arrays must be 1-D
解决: 源代码 
    plt.scatter(dataMat[0], dataMat[1], c='red', marker='o') 有误, 修改成
    plt.scatter(dataMat[0].tolist(), dataMat[1].tolist(), c='red', marker='o')
'''


import numpy as np
from numpy import *
import matplotlib.pyplot as plt

# 测试数据集 - 二维list
dataSet = [[-0.17612, 14.053064],[-1.395634, 4.662541], [-0.752157, 6.538620], [-1.322371, 7.152823], [0.423363, 11.054677], [0.406704, 7.067335],[0.667394, 12.741452], [-2.460150, 6.866805], [0.569411, 9.548755], [-0.026632, 10.427743], [0.850443, 6.920334], [1.347183, 13.175500], [1.176813, 3.167020], [-1.781871, 9.097953]]

dataMat = mat(dataSet).T
plt.scatter(dataMat[0].tolist(), dataMat[1].tolist(), c='red', marker='o')

# 绘制直线图形
X = np.linspace(-2, 2, 100)

Y = 2.8 * X + 9

plt.plot(X, Y)
plt.show()


