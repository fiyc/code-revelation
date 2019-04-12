#include <stdio.h>

int strend(char * s, char *t)
{
  int lens = 0;
  for(; *s; s++)
	lens++;

  int lent = 0;
  for(; *t; t++)
	lent++;

  while(lent > 0){
	if(lens <= 0 || *--s != *--t)
	  return 0;

	lens--;
	lent--;
  }

  return 1;
}


int main()
{
  char *s = "sjdlfjslkdjfklsdjf";
  char *t = "ksdjf";

  printf("%d\n", strend(s, t));
}
