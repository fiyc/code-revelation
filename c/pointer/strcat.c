#include <stdio.h>


void strcat(char *s, char *t)
{
  for( ; *s != '\0'; s++)
	;

  while(*s++ = *t++)
	;
}


int main()
{
  char s[1000] = "hello, my name is: ";
  char *t = "world";
  strcat(s, t);
  printf("%s\n", s);
}


