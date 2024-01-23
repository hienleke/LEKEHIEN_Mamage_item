import React, { useState } from "react";
import "./CategoryForm.css";
const CategoryForm = () => {
     const [formData, setFormData] = useState({
          name: "",
          description: "",
     });

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          // Implement your logic to submit the form data
          console.log("Form submitted:", formData);
     };

     return (
          <form onSubmit={handleSubmit}>
               <h3>Add/Edit Category</h3>
               <label htmlFor="name">Name:</label>
               <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
               <label htmlFor="description">Description:</label>
               <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
               <button type="submit">Submit</button>
          </form>
     );
};

export default CategoryForm;
