# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-07 14:26
@FileName : tcp_client.py
@Description : 
    - TCP客户端
'''


import socket
target_host = "127.0.0.1"
target_port = 9999

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client.connect((target_host, target_port))

client.send(bytes("GET / HTTP/1.1\r\nHOST: google.com\r\n\r\n", 'utf-8'))

response = client.recv(4096)
print(response)