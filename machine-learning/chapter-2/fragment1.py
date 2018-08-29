# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-08-29 10:02
@FileName : fragment1.py
@Description : 
    - 使用jieba分词
'''

import sys
import os
import jieba

text = "小明1995年毕业于北京清华大学"
text = "一般像这种最后谁也想不明白的问题, 最终都交给概率论"
text = "hello, my name is fiyc"

seg_list = jieba.cut(text, cut_all=False)
print("[%s]" % "] [".join(seg_list))

seg_list = jieba.cut(text)
print("[%s]" % "] [".join(seg_list))

seg_list = jieba.cut(text, cut_all=True)
print("[%s]" % "] [".join(seg_list))