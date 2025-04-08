// console.log always moves the cursor to a new line.
console.log("Hello world!");
console.log("Hello");
console.log(" world!");

// process.stdout.write writes character on the same line
// except when you use escape characters \n \t, etc.
process.stdout.write("Hello\t");
process.stdout.write("world!");

process.stdout.write("\nHello world!");
process.stdout.write("\n");
