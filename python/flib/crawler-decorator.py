# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-07-10 10:53
@FileName : crawler-decorator
@Description : 
    - 一个爬虫数据解析规则的装饰器
    - 封装请求逻辑， 只关注数据解析
'''



import frequest
import flog

'''
爬虫解析函数装饰器
@retry 重试次数
@timeout 超时时间
@encode 编码
'''
def crawlHander(retry, timeout, encode):

    '''
    真实封装解析函数的高阶函数
    @func 解析函数， 要求请求参数接受一个字符串
    '''
    def realDecorator(func):
        '''
        最后生成， 将被函数
        @url 请求地址
        @data post参数
        '''
        def finalFunc(url, data = None):
            param = {
                "url": url,
                "data": data,
                "retry": retry,
                "timeout": timeout,
                "encode": encode
            }

            html = frequest.request(param)
            result = func(html)
            return result

        return finalFunc

    return realDecorator


## 测试
if __name__ == "__main__":

    @crawlHander(1, 10, "utf-8")
    def hander(html):
        return html[0:10]

    result = hander("http://www.baidu.com")
    flog.info(result)