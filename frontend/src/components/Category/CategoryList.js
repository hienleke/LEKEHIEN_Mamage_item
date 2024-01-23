import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryForm";
import "./CategoryList.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import api from "../../services/api";

const CategoryList = () => {
     const [categories, setCategories] = useState([]);
     const [newCategory, setNewCategory] = useState({ name: "", description: "", status: "active" });
     const [editCategory, setEditCategory] = useState({ id: null, name: "", description: "", status: "" });

     const fetchCategories = async () => {
          try {
               const response = await api.get("/categories");
               setCategories(response.data);
          } catch (error) {
               console.error("Error fetching categories:", error);
          }
     };

     const handleAddCategory = async () => {
          try {
               if (newCategory.name) {
                    await api.post("/categories", { ...newCategory });
                    setNewCategory({ name: "", description: "", status: "active" });
                    fetchCategories();
               }
          } catch (error) {
               console.error("Error adding category:", error);
          }
     };

     const handleEditCategory = (categoryId, categoryName, categoryDescription, categoryStatus) => {
          setEditCategory({ id: categoryId, name: categoryName, description: categoryDescription, status: categoryStatus });
     };

     const handleUpdateCategory = async () => {
          try {
               if (editCategory.name) {
                    await api.put(`/categories/${editCategory.id}`, { ...editCategory });
                    setEditCategory({ id: null, name: "", description: "", status: "" });
                    fetchCategories();
               }
          } catch (error) {
               console.error("Error updating category:", error);
          }
     };

     const handleDeleteCategory = async (categoryId) => {
          try {
               await api.delete(`/categories/${categoryId}`);
               fetchCategories();
          } catch (error) {
               console.error("Error deleting category:", error);
          }
     };

     useEffect(() => {
          fetchCategories();
     }, []);

     return (
          <div>
               <h2>Categories</h2>
               <TableContainer component={Paper}>
                    <Table>
                         <TableHead>
                              <TableRow>
                                   <TableCell>ID</TableCell>
                                   <TableCell>Name</TableCell>
                                   <TableCell>Description</TableCell>
                                   <TableCell>Status</TableCell>
                                   <TableCell>Action</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {categories.map((category) => (
                                   <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>{category.status}</TableCell>
                                        <TableCell>
                                             <Button onClick={() => handleEditCategory(category.id, category.name, category.description, category.status)}>Edit</Button>
                                             <Button onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
               <div>
                    <TextField label="Name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
                    <TextField label="Description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                    <TextField label="Status" value={newCategory.status} onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })} />
                    <Button onClick={handleAddCategory}>Add Category</Button>
               </div>
               {editCategory.id && (
                    <div>
                         <TextField label="Name" value={editCategory.name} onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} />
                         <TextField label="Description" value={editCategory.description} onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })} />
                         <TextField label="Status" value={editCategory.status} onChange={(e) => setEditCategory({ ...editCategory, status: e.target.value })} />
                         <Button onClick={handleUpdateCategory}>Update Category</Button>
                    </div>
               )}
          </div>
     );
};

export default CategoryList;
