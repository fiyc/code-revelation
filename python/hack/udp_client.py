# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-07 14:32
@FileName : udp_client.py
@Description : 
    - UDP客户端
'''
import socket
target_host = "127.0.0.1"
target_port = 80

client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

b = bytes("AAABBBCCC", 'utf-8')
client.sendto(b, (target_host, target_port))

data, addr = client.recv(4096)
print(data)