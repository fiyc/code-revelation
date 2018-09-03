# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-03 17:36
@FileName : fragment1.py
@Description : 
    - BP网络的实现
'''
from numpy import *

class BPNet(object):
    # 构造函数
    def __init__(self):
        # 以下参数需要手工设置
        self.eb = 0.01       # 误差容限: 当误差小于这个值时, 算法收敛, 程序停止
        self.iterator = 0    # 算法收敛时的迭代次数
        self.eta = 0.1       # 学习率: 相当于步长
        self.mc = 0.3        # 动量因子: 引入一个调优参数, 是主要的调优参数
        self.maxiter = 3000  # 最大迭代次数
        self.nHidden = 4     # 隐含层神经元
        self.nOut = 1        # 输出层个数

        # 一下属性由系统生成
        self.errlist = []    # 误差列表: 保存了误差参数的变化用于评估收敛
        self.dataMat = []    # 训练集
        self.classLabels = 0 # 分类标签集
        self.nSampNum = 0    # 样本集行数
        self.nSampDim = 0    # 样本列数
        pass

    # 激活(传递)函数
    def logistic(self, net):
        pass
    
    # 激活(传递)函数的导函数
    def dlogit(self, net):
        pass

    # 矩阵各元素平方之和
    def errorfunc(self, inX):
        pass

    # 数据标准化(归一化)
    def normalize(self, dataMat):
        pass
    
    # 加载数据集
    def loadDataSet(self, filename):
        self.dataMat = []
        self.classLabels = []
        fr = open(filename)

        for line in fr.readlines():
            lineArr = line.strip().split()
            self.dataMat.append([float(lineArr[0]), float(lineArr[1]), 1.0])
            self.classLabels.append(int(lineArr[2]))

        self.dataMat = mat(self.dataMat)
        m, n = shape(self.dataMat)
        self.nSampNum = m;    # 样本数量
        self.nSampDim = n - 1 # 样本维度
        pass
    
    # 增加新列
    def addcol(self, matrix1, matrix2):
        pass

    # 隐藏层 初始化
    def init_hiddenWB(self):
        self.hi_w = 2.0 * (random.rand(self.nHidden, self.nSampDim) - 0.5)
        self.hi_b = 2.0 * (random.rand(self.nHidden, 1) - 0.5)
        self.hi_wb = mat(self.addcol(mat(self.hi_w), mat(self.hi_b)))

    # 输出层 初始化
    def init_OutputWB(self):
        self.out_w = 2.0 * (random.rand(self.nOut, self.nHidden) - 0.5)
        self.out_b = 2.0 * (random.rand(self.nOut, 1) - 0.5)
        self.out_wb = mat(self.addcol(mat(self.out_w), mat(self.out_b)))

    # BP 网络主程序
    def bpTrain(self):
        pass

    # BP 网络分类器
    def BPClassfier(self, start, end, steps = 30):
        pass

    # 绘制分类线
    def classfyLine(self, plt, x, z):
        pass


    # 绘制趋势线: 可调整颜色
    def TrendLine(self, plt, color='r'):
        pass
    
    # 绘制分类点
    def drawClassScatter(self, plt):
        pass
    
