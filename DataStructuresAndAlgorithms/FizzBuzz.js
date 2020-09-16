// Write a short program that prints each number from 1 to 100 on a new line. 

// For each multiple of 3, print "Fizz" instead of the number. 

// For each multiple of 5, print "Buzz" instead of the number. 

// For numbers which are multiples of both 3 and 5, print "FizzBuzz" instead of the number.


function fizzBuzz(){
  for(let i = 1; i <= 100; i++) {
    if(i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz")
    } else if(i % 5 === 0) {
      console.log("Buzz")
    } else if (i % 3 === 0) {
      console.log("Fizz")
    } else {
      console.log(i)
    }
  }
}

function reverseString(str) {
  const mid = Math.floor(str.length / 2);
  const splitString = str.split("");
  for(let i = 0; i <= mid; i++) {
    let tmp = splitString[i];
    splitString[i] = splitString[str.length - 1 - i];
    splitString[str.length - 1 - i] = tmp;
  }
  return splitString.join("");

}

function recursiveReverseString(str) {
  if( str === "" ){
    return "";
  }
  return recursiveReverseString(str.substr(1)) + str.charAt(0);
}

a = "hola";
a.substr()