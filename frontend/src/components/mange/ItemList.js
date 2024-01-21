import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../../redux/actions/iteamActions";
import "./ItemList.css";
const ItemList = () => {
     const items = useSelector((state) => state.items);
     const filter = useSelector((state) => state.filter);
     const dispatch = useDispatch();

     const filteredItems = filter ? items.filter((item) => item.category.toLowerCase().includes(filter.toLowerCase())) : items;

     const handleDelete = (id) => {
          dispatch(deleteItem(id));
     };

     return (
          <div>
               <h2>Item List</h2>
               <label>Filter by Category:</label>
               <input type="text" value={filter} onChange={(e) => dispatch({ type: "FILTER_ITEMS", payload: e.target.value })} />
               <ul>
                    {filteredItems.map((item) => (
                         <li key={item.id}>
                              {item.name} - {item.type} - {item.category} - ${item.price}
                              <button onClick={() => handleDelete(item.id)}>Delete</button>
                         </li>
                    ))}
               </ul>
          </div>
     );
};

export default ItemList;
