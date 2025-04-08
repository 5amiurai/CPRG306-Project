// this code takes a number and return an array of all its digits.
num = 434398834;
digits = new Array(9)
count = 9;
while(num != 0)
{
    digit = num%10;
    num = (num/10)|0;
    digits[--count]=digit
}
console.log(digits)

