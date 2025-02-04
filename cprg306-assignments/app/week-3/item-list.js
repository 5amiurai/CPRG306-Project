import Item from "./item"

export default function itemList(){
  const items = [
    { name: "Milk, 4 L 🥛", quantity: 1, category: "Dairy" },
    { name: "Bread 🍞", quantity: 2, category: "Bakery" },
    { name: "Eggs, dozen 🥚", quantity: 2, category: "Dairy" },
    { name: "Bananas 🍌", quantity: 6, category: "Produce" },
    { name: "Broccoli 🥦", quantity: 3, category: "Produce" },
    { name: "Chicken breasts, 1 kg 🍗", quantity: 1, category: "Meat" },
    { name: "Pasta sauce 🍝", quantity: 3, category: "Canned Goods" },
    { name: "Spaghetti, 454 g 🍝", quantity: 2, category: "Dry Goods" },
    { name: "Toilet paper, 12 pack 🧻", quantity: 1, category: "Household" },
    { name: "Dish soap 🍽️", quantity: 1, category: "Household" },
    { name: "Hand soap 🧼", quantity: 4, category: "Household" },
  ];


return(
  <main>
    {items.map((item,index) => (
      <Item key={index} item={item} />
    ))}
  </main>

)
}