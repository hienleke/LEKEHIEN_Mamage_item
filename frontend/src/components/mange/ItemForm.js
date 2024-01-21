import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actions/iteamActions";
import "./ItemForm.css";
const ItemForm = () => {
     const [formData, setFormData] = useState({
          name: "",
          type: "",
          category: "",
          price: "",
     });

     const dispatch = useDispatch();

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          dispatch(addItem({ ...formData, id: Date.now() }));
          setFormData({
               name: "",
               type: "",
               category: "",
               price: "",
          });
     };

     return (
          <div>
               <h2>Add Item</h2>
               <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    <label>Type:</label>
                    <input type="text" name="type" value={formData.type} onChange={handleChange} />
                    <label>Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} />
                    <label>Price:</label>
                    <input type="text" name="price" value={formData.price} onChange={handleChange} />
                    <button type="submit">Add Item</button>
               </form>
          </div>
     );
};

export default ItemForm;
