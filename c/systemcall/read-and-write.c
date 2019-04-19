/**
* @Author: fiyc
* @Date : 2019-04-15 09:45
* @FileName : read-and-write.c
* @Description :
*     - 系统调用 read write
      - 函数原型
        int n_read = read(int fd, char *buf, int n);
        int n_written = write(int fd, char *buf, int n);
*/

#include <fcntl.h>
#include <stdio.h>

main()
{
    char *name = "/home/hc/Documents/createfile";
    int fd;

    fd = creat(name, 0);
    
    printf("文件描述符: %d", fd);
    return 0;
}
