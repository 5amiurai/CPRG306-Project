"use client";
import {useState} from "react";

export default function NewItem() {

   const[quantity, setQuantity] = useState(1);
   const increment = () => { if (quantity < 20 ){ setQuantity(quantity + 1);}}
   const decrement = () => { if (quantity > 1 ){ setQuantity(quantity - 1);}}

   return(
    <div>
        <p>Quantity: {quantity}</p>
        <button onClick={increment} className="bg-blue-500 hover:bg-blue-700 text-write w-20 rounded-lg"> + </button>
        <button onClick={decrement} className="bg-red-500 hover:bg-red-700 text-write w-20 rounded-lg"> - </button>







    </div>
   )


}