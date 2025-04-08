for (let i = 1; i <= 8; i++) {
  process.stdout.write(i.toString()+"\t");
}

for(let i = 1; i<6;i++)
{
    process.stdout.write("\n");
    if (i == 3)
        continue;
    for (let j = 1; j<8;j++)
    {
        if(j == 6)
            break;
        process.stdout.write(i.toString()+"x"+j.toString()+" = "+(i*j).toString()+" ");
        
    }
}