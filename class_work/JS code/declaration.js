//automatic
firstName = "John"

// using var
var msg = "Hi "

function greet()
{
    var msg = "Hello ";
    console.log(msg + firstName);
}
console.log(msg + firstName);
greet();

// using let
let id = 123;
id = 1234;

function printId()
{
    console.log(id);
}

const country = "Canada";

country = "USA"; //error

