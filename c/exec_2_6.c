#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-08 22:31
* @FileName : exec_2_6.c
* @Description : 
    - 练习2.6 setbits
*/

unsigned int setbits(unsigned int x, int p, int n , unsigned int y)
{
    int leftX = (~0 << (p + 1));
    int rightX = ~(~0 << (p + 1 - n));
    x &= leftX | rightX;
    y &= (~(~0 << n));
    y <<= (p + 1 - n);

    x |= y;
    return x;
}


main()
{
    int x = 90; // 1011010
    int y = 80; // 1010000

    x = setbits(x, 5, 3, y); // 1000010
    printf("输出 %d\n", x);
    return 0;
}
