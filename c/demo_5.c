#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-07 00:36
* @FileName : demo_4.c
* @Description : 
    - 统计文件行数
*/

int main()
{
    long nl = 0;
    int c;
    while((c = getchar()) != EOF){
        if(c == '\n'){
            ++nl;
        }
    }

    if(nl > 0){
        ++nl;
    }
    printf("this line number of input is: %ld\n", nl);
    return 0;
}