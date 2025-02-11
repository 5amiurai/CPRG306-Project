// item-list.js
import Item from './item';

const ItemList = ({ items, onItemSelect }) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <Item key={index} name={item.name} category={item.category} onSelect={onItemSelect} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
