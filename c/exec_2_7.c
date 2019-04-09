#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-08 23:19
* @FileName : exec_2_7.c
* @Description : 
    - 练习2.7
*/

unsigned int invert(int x, int p, int n);

int main()
{
    int x = 90; //1011010
                //0011100
    x = invert(x, 5, 3); //1100010
    printf("输出 %u\n", x);
}

unsigned int invert(int x, int p, int n)
{
    int ornot = ~(~0 << p+1);
    printf("ornot %u\n", ornot);
    ornot &= ~0 << (p + 1 - n);
    printf("ornot %u\n", ornot);
    x ^= ornot;
    return x;
}
