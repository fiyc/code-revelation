#include <stdio.h>
#define ALLOCSIZE 10000 /* 可用空间大小 */

static char allocbuf[ALLOCSIZE];
static char *allocp = allocbuf; /* 下一个空闲位置 */

char *alloc(int n)
{
  if(allocbuf + ALLOCSIZE - allocp >= n){
	allocp += n;
	return allocp - n;
  }else
	return 0;
  
}

void afree(char *p)
{
  if(p >= allocbuf && p <= allocbuf + ALLOCSIZE){
	allocp = p;
  }
}

int main()
{
  char *name = alloc(8);
  *name = 'h';
  *(name + 1) = 'i';
  printf("this is %s\n", name);
}



