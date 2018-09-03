# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-03 14:53
@FileName : fragment3.py
@Description : 
    - 使用Sickit-Learn 的KMeans进行聚类计算
'''


from numpy import *
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

def file2matrix(path, delimiter):
    recordList = []
    fp = open(path, 'rb')
    content = fp.read().decode('utf8')
    fp.close()
    rowlist = content.splitlines()

    recordList = [row.split(delimiter) for row in rowlist if row.strip()]
    return mat(recordList)

# 绘制散点图    
def drawScatter(plt,mydata,size=20,color='blue',mrkr='o'):
	plt.scatter(mydata.T[0].tolist(),mydata.T[1].tolist(),s=size,c=color,marker=mrkr) 

k = 4
dataPath = "C:\\Users\\fiyc\\Documents\\code\\private\\MLBook\\chapter04\\testdata\\4k2_far.txt"
dataSet = file2matrix(dataPath, '\t')
dataMat = mat(dataSet[:, 1:])

kmeans = KMeans(init='k-means++', n_clusters=4)
kmeans.fit(dataMat)

drawScatter(plt, dataMat, size=20, color='b', mrkr='.')
drawScatter(plt, kmeans.cluster_centers_, size=60, color='red', mrkr='D')
plt.show()
