#include <ctype.h>
#include <stdio.h>

double atof(char s[])
{
  double result, power;
  int i, sign;

  for(i = 0; isspace(s[i]); i++)
	;

  sign = s[i] == '-' ? -1 : 1;
  printf("sign = %d\n", sign);
  if(s[i] == '+' || s[i] == '-')
	i++;

  for(result = 0.0; isdigit(s[i]); i++)
	result = result * 10 + (s[i] - '0');

  if(s[i] == '.')
	i++;

  for(power = 1.0; isdigit(s[i]); i++){
	result = result * 10 + (s[i] - '0');
	power *= 10;
  }

  result = result * sign / power;
  return result;
}


int main(int argc, char *argv[])
{
  if(argc <= 1)
	return 1;

  double result = atof(argv[1]);
  printf("转化结果: %f\n", result);
}


