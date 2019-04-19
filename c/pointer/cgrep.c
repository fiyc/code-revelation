/**
* @Author: fiyc
* @Date : 2019-04-13 14:34
* @FileName : cgrep.c
* @Description :
*     - 实现grep
*/

#include <stdio.h>
#include <string.h>

#define MAXLINE 1000

int getline(char **line, int max);

main(int argc, char *argv[])
{
    char line[MAXLINE];

    int found = 0;

    if(argc != 2)
        printf("Usage: find pattern\n");
    else
        while(getline(&line, MAXLINE) > 0)
            if(strstr(line, argv[1]) != NULL){
                printf("%s", line);
                found++;
            }
    
    return found;
}