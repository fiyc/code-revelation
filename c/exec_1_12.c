#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-07 22:01
* @FileName : exec_1_12.c
* @Description : 
    - 练习1-12
*/

#define IN 1
#define OUT 0

int main()
{
    int c = getchar();
    int prec = c;

    while(c != EOF){
        if(IsOUT(c) && IsOUT(prec)){
            c = getchar();
            continue;
        }

        prec = c;
        if(IsOUT(c)){
            putchar('\n');
        }else{
            putchar(c);
        }

        c = getchar();
    }

    return 0;
}

int IsOUT(int c)
{
    if(c == ' ' || c == '\n' || c == '\t'){
        return 1;
    }else{
        return 0;
    }
}
