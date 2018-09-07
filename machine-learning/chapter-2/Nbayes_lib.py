# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-29 11:18
@FileName : Nbayes_lib.py
@Description : 
    - 朴素贝叶斯类
'''


'''
产生数据集
'''
import numpy as np

def loadDataSet():
    postingList = [['my', 'dog', 'has','flea', 'problems', 'help', 'please'],
                   ['maybe', 'not', 'take', 'him', 'to', 'dog', 'park', 'stupid'],
                   ['my', 'dalmation', 'is', 'so', 'cute', 'I', 'love', 'him', 'my'],
                   ['stop', 'posting', 'stupid', 'worthless', 'garbage'],
                   ['mr', 'licks', 'ate', 'my', 'steak', 'how', 'to', 'stop', 'him'],
                   ['quit', 'buying', 'worthless', 'dog', 'food', 'stupid']]

    classVec = [0,1,0,1,0,1]
    return postingList, classVec


'''
贝叶斯算法类
'''
class NBayes(object):
    def __init__(self):
        self.vocabulary = [] # 词典
        self.idf = 0         # 词典的IDF权重
        self.tf = 0          # 训练集的权值矩阵
        self.tdm = 0         # P(x|yi)
        self.Pcates = {}     # P(yi) 是一个类别字典
        self.labels = []     # 对应每个文本的分类, 是一个外部导入的列表
        self.doclength = 0   # 训练集文本数
        self.vocablen = 0    # 词典词长
        self.testset = 0     # 测试集

    '''
    导入和训练数据集, 生成算法必须的参数和数据结构
    '''
    def train_set(self, trainset, classVec):
        self.cate_prob(classVec) # 计算分类所占比例
        self.doclength = len(trainset) # 计算一共有多少个文本
        tempset = set()
        [ tempset.add(word) for doc in trainset for word in doc ]
        self.vocabulary = list(tempset) # 整个所有出现的单词
        self.vocablen = len(self.vocabulary) # 所有单词去重总数
        self.calc_wordfreq(trainset)
        self.build_tdm()


    '''
    计算在数据集中每个分类的概率
    '''
    def cate_prob(self, classVec):
        self.labels = classVec
        labeltemps = set(classVec)
        for labeltemp in labeltemps:
            self.Pcates[labeltemp] = float(self.labels.count(labeltemp)) / float(len(self.labels))
    

    '''
    生成普通的词频向量
    '''
    def calc_wordfreq(self, trainset):
        self.idf = np.zeros([1, self.vocablen])
        self.tf = np.zeros([self.doclength, self.vocablen])

        for index in range(self.doclength):
            for word in trainset[index]:
                i = self.vocabulary.index(word)
                self.tf[index, i] += 1

            for signleword in set(trainset[index]):
                i = self.vocabulary.index(signleword)
                self.idf[0, i] += 1


    '''
    桉分类累计计算向量空间的每维值P(x|yi)
    '''
    def build_tdm(self):
        self.tdm = np.zeros([len(self.Pcates), self.vocablen])
        sumlist = np.zeros([len(self.Pcates), 1])

        for index in range(self.doclength):
            self.tdm[self.labels[index]] += self.tf[index]
            sumlist[self.labels[index]] = np.sum(self.tdm[self.labels[index]])
        
        self.tdm = self.tdm / sumlist


    '''
    将测试集映射到当前词典
    '''
    def map2vocab(self, testdata):
        self.testset = np.zeros([1, self.vocablen])

        for word in testdata:
            self.testset[0, self.vocabulary.index(word)] += 1

    '''
    预测分类结果, 输出预测的分类类别
    '''
    def predict(self, testset):
        if np.shape(testset)[1] != self.vocablen:
            print("输入错误")
            exit(0)
        
        predvalue = 0
        predclass = ""
        for tdm_vect, keyclass in zip(self.tdm, self.Pcates):
            temp = np.sum(testset * tdm_vect * self.Pcates[keyclass])
            if temp > predvalue:
                predvalue = temp
                predclass = keyclass

        return predclass