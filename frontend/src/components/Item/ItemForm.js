// ItemForm.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import "./ItemForm.css"; // Assuming you have some custom styles here
import api from "../../services/api";

const ItemForm = ({ editItemId, onClose, onSubmit }) => {
     const [formData, setFormData] = useState({
          name: "",
          description: "",
          price: 0,
          status: "active",
     });

     useEffect(() => {
          // Fetch existing item data when editing
          if (editItemId) {
               // Assuming you have an API endpoint to get item details by ID
               // Adjust the API endpoint accordingly
               api.get(`/items/${editItemId}`)
                    .then((response) => {
                         const { name, description, price, status } = response.data;
                         setFormData({ name, description, price, status });
                    })
                    .catch((error) => {
                         console.error("Error fetching item details:", error);
                    });
          }
     }, [editItemId]);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevFormData) => ({
               ...prevFormData,
               [name]: value,
          }));
     };

     const handleSubmit = () => {
          onSubmit(formData);
     };

     return (
          <Dialog open={true} onClose={onClose}>
               <DialogTitle>{editItemId ? "Edit Item" : "Add Item"}</DialogTitle>
               <DialogContent>
                    <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                    <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} />
                    <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleInputChange} />

                    <FormControl fullWidth>
                         <InputLabel>Status</InputLabel>
                         <Select name="status" value={formData.status} onChange={handleInputChange}>
                              <MenuItem value="active">active</MenuItem>
                              <MenuItem value="inactive">inactive</MenuItem>
                         </Select>
                    </FormControl>
               </DialogContent>
               <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editItemId ? "Update" : "Add"}</Button>
               </DialogActions>
          </Dialog>
     );
};

export default ItemForm;
