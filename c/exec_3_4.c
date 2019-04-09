/**
* @Author: fiyc
* @Date : 2019-04-09 22:00
* @FileName : exec_3_4.c
* @Description : 
    - 练习3-4 
*/

#include <stdio.h>
#include <string.h>

void itoa(int n, char s[]);
void reverse(char s[]);

int main()
{
   int n = -100;
   char s[] = {};
   itoa(n, s);
   printf("%s\n", s);
}


void itoa(int n, char s[])
{
    int flag = n >= 0 ? 1 : -1;
    int i = 0;

    do
    {
        s[i++] = flag * (n % 10) + '0';
    }while((n /= 10) * flag > 0);

    if(flag < 0)
    {
        s[i++] = '-';
    }
    
    s[i] = '\0';
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

