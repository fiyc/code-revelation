#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-07 00:59
* @FileName : exec_1_8.c
* @Description : 
    - 统计空格， 制表符， 换行符
*/

int main()
{
    int spaceNum = 0;  // 空格
    int tabNum = 0;    // 制表符
    int enterNum = 0; // 换行符

    int c;
    while((c = getchar()) != EOF){
        if(c == ' '){
            ++spaceNum;
        }else if (c == '\t'){
            ++tabNum;
        }else if(c == '\n'){
            ++enterNum;
        }
    }

    if(enterNum > 0){
        ++enterNum;
    }

    printf("文件共有%d个空格， %d个制表符, %d个换行符\n", spaceNum, tabNum, enterNum);
    return 0;
}