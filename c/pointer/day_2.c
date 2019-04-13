/**
* @Author: fiyc
* @Date : 2019-04-13 11:21
* @FileName : day.c
* @Description :
*     - 日期转换问题
*/

#include <stdio.h>

int day_of_year(int, int, int);
void month_day(int, int, int *, int *);

static char daytab[2][12] = {
    {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
    {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
};




int day_of_year(int year, int month, int day)
{
    int i, leap;
    leap = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    char *p = daytab[leap];

    for(i = 1; i < month; i++){
        day += *(p + i);
    }

    return day;
}

void month_day(int year, int yearday, int *pmonth, int *pday)
{
    int i, leap;
    leap = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    char *p = daytab[leap];

    for(i = 1; yearday > *(p + i); i++)
        yearday -= *(p + i);

    *pmonth = i;
    *pday = yearday;
}

int main()
{
    int year = 2019;
    int month = 4;
    int day = 13;

    int yearday = day_of_year(year, month, day);
    printf("%d年%d月%d日是%d年的第%d天\n", year, month, day, year, yearday);


    int nmonth = 0;
    int nday = 0;
    month_day(year, yearday, &nmonth, &nday);
    printf("%d年的第%d天是%d月%d日\n", year, yearday, nmonth, nday);
}