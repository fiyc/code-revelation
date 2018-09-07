# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-28 18:04
@FileName : fragment20.py
@Description : 
    - 表和线性结构的可视化
'''

import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 200)
y = np.sin(x)
yn = y + np.random.rand(1, len(y)) * 1.5

fig = plt.figure()
ax = fig.add_subplot(111)
ax.scatter(x, yn, c='blue', marker='o')
ax.plot(x, y+0.75, 'r')
plt.show()