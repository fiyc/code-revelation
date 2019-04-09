#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-07 00:36
* @FileName : demo_4.c
* @Description : 
    - 统计文件字符数
*/

int main()
{
    long nc = 0;
    while(getchar() != EOF){
        ++nc;
    }

    printf("this char number of input is: %ld", nc);
    return 0;
}