let firstName = "John";
let age = 20;
let arrivalTime = new Date(2025, 1, 9, 11, 0, 0);

if (arrivalTime.getHours() < 11) {
  console.log("Sorry you have to wait for the doors to open..");
} else {
  if (age < 18) console.log("Sorry, but this party is for adults only");
  else console.log(`Hi ${firstName}, welcome to the party`);
}

// Ternary operator

age>18 ? console.log("You are Okay to enter the party"): 
        console.log("You are too young!!");