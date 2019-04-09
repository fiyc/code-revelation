#include <stdio.h>

/**
* @Author: fiyc
* @Date : 2019-04-06 23:22
* @FileName : demo_2.c
* @Description : 
    温度转化
*/

int main()
{
    float fahr, celsius;
    int lower, upper, step;

    lower = 0;
    upper = 300;
    step = 20;

    fahr = lower;
    printf("%s\t%s\n", "华氏温度", "摄氏温度");
    while(fahr <= upper){
        celsius = 5 * (fahr - 32) / 9;
        printf("%3.0f\t%6.1f\n", fahr, celsius);
        fahr += step;
    }

    return 0;
}