# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-07-10 10:12
@FileName : frequest.py
@Description : 
    - 封装了request请求
    - 随机USER_AGENTS
    - 自动重试
'''

import random
import urllib.request

from . import flog as log

# 随机userAgent池
USER_AGENTS = ["Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19",
                "Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
                "Mozilla/5.0 (Linux; U; Android 2.2; en-gb; GT-P1000 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
                "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0",
                "Mozilla/5.0 (Android; Mobile; rv:14.0) Gecko/14.0 Firefox/14.0",
                "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36",
                "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19",
                "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3",
                "Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3"]

# 获取一个随机的userAgent
def __getUserAgent():
    userAgentIndex = random.randrange(0, len(USER_AGENTS))
    return USER_AGENTS[userAgentIndex]

'''
请求封装
@param
    - url: 请求地址(必须)
    - data: post数据
    - retry: 重试次数(默认1)
    - timeout: 超时时间(默认10)
    - encode: 编码格式(默认utf-8)
'''
def request(param, header = None):
    default_req = {
        'url':'',
        'data':'',
        'retry':1,
        'timeout':10,
        'encode': 'utf-8'
    }

    default_header = {
        'User-Agent': __getUserAgent()
    }

    if(param != None):
        default_req.update(param)

    if(header != None):
        default_header.update(header)

    data = default_req['data']
    if(data == ''):
        data = None
    
    url = default_req['url']
    if(url == None or url == ''):
        return None

    encode = default_req['encode']
    if(encode == None or encode == ''):
        encode = 'utf-8'

    timeout = default_req['timeout']
    maxRequest = default_req['retry']
    req = urllib.request.Request(url, data = data, headers = default_header)

    hasresponse = False
    retryNum = 0

    html = ''
    while(not hasresponse and retryNum < maxRequest):
        retryNum = retryNum + 1
        try:
            response = urllib.request.urlopen(req, timeout = timeout)
            a = response.read()
            html = a.decode(encode)

            if(html != None and html != ''):
                hasresponse = True

        except Exception as e:
            log.error("请求: %s -- 失败, %d/%d" % (url, retryNum, maxRequest))

    return html



## 测试
if __name__ == "__main__":
    result = request({
        "url": "http://www.baidu.com"
    })
    log.info("获取请求结果 %s" % result)