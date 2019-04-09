#include <stdio.h>
/**
* @Author: fiyc
* @Date : 2019-04-07 21:52
* @FileName : demo_6.c
* @Description : 
    - 统计单词数
*/

#define IN 1
#define OUT 0

int main()
{
    int c, nw, state;
    state = OUT;
    nw = 0;
    while((c = getchar()) != EOF){
        if(c == ' ' || c == '\t' || c == '\n'){
            state = OUT;
        }else if(state == OUT){
            state = IN;
            ++nw;
        }
    }

    printf("共有%d个单词", nw);
}