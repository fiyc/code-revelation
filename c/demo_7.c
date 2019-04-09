#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-08 22:23
* @FileName : demo_7.c
* @Description : 
    - getbits
*/

unsigned getbits(unsigned x, int p, int n);

main()
{

}


unsigned getbits(unsigned x, int p, int n)
{
    return (x >> (p - n + 1)) & ~(~0 << n);
}
