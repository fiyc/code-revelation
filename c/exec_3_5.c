/**
* @Author: fiyc
* @Date : 2019-04-09 22:21
* @FileName : exec_3_5.c
* @Description : 
    - 练习3-5
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void itob(unsigned int n, char s[], int b);
void reverse(char s[]);

int main(int argc, char *argv[])
{
    int n = 256;
    int b = 16;
    if(argc == 3){
        n = atoi(argv[1]);
        b = atoi(argv[2]);
    }

    char s[] = {};
    itob(n, s, b);
    printf("%s\n", s);
}


void itob(unsigned int n, char s[], int b)
{
    int i = 0;
    do
    {
        int m = n % b;
        if(m < 10){
            s[i++] = m + '0';
        }else{
            s[i++] = m - 10 + 'A';
        }
    } while ((n /= b) > 0);
    reverse(s);
}

void reverse(char s[])
{
    int c, i, j;
    for(i = 0, j = strlen(s) - 1; i < j; i++, j--)
    {
        c = s[i];
        s[i] = s[j];
        s[j] = c;
    }
}

