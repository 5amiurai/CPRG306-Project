let arr1 = new Array();
let arr2 = [];
let arr3 = new Array(5);
arr2[0] = 3;
arr3 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // note the size is 6
console.log(arr1);
console.log(arr2);
console.log(arr3);

// copying arrays
let weekdays = arr3.slice(0, 5); // from index 0, and count 5 elements.
console.log(weekdays);

let week = ["Sun", ...weekdays, "Mon"];
console.log(week);

let arr = Array.from(arr2)

console.log(arr)
