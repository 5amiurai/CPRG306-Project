let array = [1, 2, 3, 4, 5];
console.log("squares");
array.forEach(i=>process.stdout.write((i*i).toString()+"\t")) // squares each element.
console.log("\ncubes")
array.forEach(x=>{ if (x==4) return; else process.stdout.write((x**3).toString()+"\t")})
