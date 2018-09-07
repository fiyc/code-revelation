# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-29 15:12
@FileName : fragment2.py
@Description : 
    - 使用朴素贝叶斯类
'''

import sys
import os
from numpy import *
import numpy as np
from Nbayes_lib import *

dataSet, listClasses = loadDataSet()

nb = NBayes()
nb.train_set(dataSet, listClasses)
nb.map2vocab(dataSet[1])
print(nb.predict(nb.testset))