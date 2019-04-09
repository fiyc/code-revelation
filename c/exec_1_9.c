#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-07 01:07
* @FileName : exec_1_9.c
* @Description : 
    - 多个空格合并为一个
*/

int main()
{
    int c = getchar();
    int prec = c;

    while(c != EOF){
        if(c != ' ' || prec != ' '){
            putchar(c);
        }
        prec = c;
        c = getchar();
    }

    putchar('\n');
    return 0;
}