# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-07-10 11:17
@FileName : test-crawler.py
@Description : 
    - 用来测试爬虫框架可用性的测试爬虫
    - 包含一个导入上级目录模块的方法
    - 爬取简书首页文章标题以及地址
'''


import sys
import os
import re

# 当前文件路径
cwd = os.path.dirname(os.path.realpath(__file__))

# 获取上级目录路径`
parentPath = os.path.abspath(os.path.dirname(cwd) + os.path.sep + ".")

# 将上一级目录加入到path
sys.path.append(parentPath)

#import flib
import flib.flog as log
import flib.crawler_decorator as crawler

@crawler.crawlHander(1, 10, 'gbk')
def analysis(html):
    # result = re.findall('<a class="title" target="_blank" href="(.*?)">([\s\S]*?)</a>', html)
    result = re.findall('<div id="content">([\s\S]*?)</div>', html)
    return result


result = analysis('http://www.biquyun.com/16_16271/6419915.html', None)
print(result)






