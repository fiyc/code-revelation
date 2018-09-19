# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-19 13:56
@FileName : bh_sshserver.py
@Description : 
    - 通过paramiko使用ssh
    - 服务端
'''

import socket
import paramiko
import threading
import sys

host_key = paramiko.RSAKey(filename='C:\\Users\\fiyc\\.ssh\\id_rsa')

def convert2Str(source):
    byte_type = type(b'byte')
    str_type = type('str')
    if type(source) == byte_type:
        return source.decode('utf8')
    
    return source


class Server(paramiko.ServerInterface):
    def _init_(self):
        self.event = threading.Event()

    def check_channel_request(self, kind, chanid):
        if kind == 'session':
            return paramiko.OPEN_SUCCEEDED
        
        return paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED
    
    def check_auth_password(self, username, password):
        if(username == 'fiyc' and password == 'fiyc'):
            return paramiko.AUTH_SUCCESSFUL
        
        return paramiko.AUTH_FAILED


# server = sys.argv[1]
# ssh_port = int(sys.argv[2])
server = '127.0.0.1'
ssh_port = 22

try:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((server, ssh_port))
    sock.listen(100)
    print("[+] Listening for connecting..")

    client, addr = sock.accept()
except Exception as ex:
    print("[-] Listen failed: " + str(ex))
    sys.exit(1)


try:
    bhSession = paramiko.Transport(client)
    bhSession.add_server_key(host_key)
    server = Server()

    try:
        bhSession.start_server(server=server)
    except paramiko.SSHException as x:
        print("[-] SSH negotiation failed.")
    
    chan = bhSession.accept(20)

    print("[+] Authenticated!")
    print(chan.recv(1024))
    chan.send("Welcome to bh_ssh")

    while True:
        try:
            command = input("Enter command: ").strip('\n')
            if(command != 'exit'):
                chan.send(command)
                print(chan.recv(1024).decode() + '\n')
            else:
                chan.send('exit')
                print('exiting')
                bhSession.close()
                raise Exception('exit')
        except KeyboardInterrupt:
            bhSession.close()
except Exception as ex:
    print("[-] Caught exception: " + str(ex))
    try:
        bhSession.close()
    except:
        pass
    
    sys.exit(1)