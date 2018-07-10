# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-07-10 10:26
@FileName : flog.py
@Description : 
    - 通用的日志打印封装
'''



import time

# 获取当前时间描述
def __currentTime():
    currentTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    return currentTime

def __pringLog(tag, msg):
    current = __currentTime()
    msg = "%s - %s: %s" % (current, tag, msg)
    print(msg)

def info(msg):
    __pringLog("info", msg)

def error(msg):
    __pringLog("error", msg)



## 测试
if __name__ == "__main__":
    info("this is a info message.")
    error("this is a error message.")