import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import { Table, Input, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import api, { fetchToken } from "../../services/api";
import "./ItemList.css";
const ItemList = () => {
     const [items, setItems] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalItems, setTotalItems] = useState(0);

     const [showItemForm, setShowItemForm] = useState(false);
     const [editItemId, setEditItemId] = useState(null);

     const [filter, setFilter] = useState({
          status: "",
          name: "",
          price: "",
          category_name: "",
          created_at: "",
          updated_at: "",
     });

     const fetchItems = async () => {
          try {
               await fetchToken();
               const response = await api.get(`/item/filter?page=${currentPage}&status.eq=active`);
               setItems(response.data.items);
               setTotalItems(response.data.totalItems);
          } catch (error) {
               console.error("Error fetching items:", error);
          }
     };

     const fetchItemsFilter = async () => {
          try {
               await fetchToken();
               let string_query = "";
               if (filter.status) string_query += `&status.eq=${filter.status}`;
               if (filter.price) string_query += `&price.eq=${filter.price}`;
               if (filter.name) string_query += `&name.iLike=%${filter.name}%`;
               if (filter.category_name) string_query += `&category_name.iLike=%${filter.category_name}%`;
               if (filter.created_at) string_query += `&created_at.eq=${filter.created_at}`;
               if (filter.updated_at) string_query += `&updated_at.eq=${filter.updated_at}`;

               const response = await api.get(`/item/filter?page=${currentPage}${string_query}`);

               setItems(response.data.items);
               setTotalItems(response.data.totalItems);
          } catch (error) {
               console.error("Error fetching items:", error);
          }
     };

     const toggleItemForm = (itemId = null) => {
          setEditItemId(itemId);
          setShowItemForm(!showItemForm);
     };

     const handleItemFormClose = () => {
          toggleItemForm();
     };

     const handleItemFormSubmit = async (formData) => {
          try {
               if (editItemId) {
                    // Update existing item
                    await fetchToken();
                    await api.put(`/item/${editItemId}`, formData);
               } else {
                    // Create new item
                    await fetchToken();
                    await api.post("/item", formData);
               }

               // Close the form and refresh the items
               handleItemFormClose();
               fetchItems();
          } catch (error) {
               console.error("Error submitting item form:", error);
          }
     };

     const paginate = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleFilterChange = (event) => {
          const { name, value } = event.target;
          setFilter((prevFilter) => ({
               ...prevFilter,
               [name]: value,
          }));
     };

     const handleDeleteItem = async (itemId) => {
          try {
               await fetchToken();
               await api.delete(`/item/${itemId}`);
               // Refresh the items after deletion
               fetchItems();
          } catch (error) {
               console.error("Error deleting item:", error);
          }
     };

     useEffect(() => {
          fetchItems();
     }, [currentPage]);

     return (
          <div>
               <h2>Items</h2>
               <Button onClick={() => toggleItemForm()}>Add Item</Button>
               <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select value={filter.status} name="status" onChange={handleFilterChange}>
                         <MenuItem value="">All</MenuItem>
                         <MenuItem value="active">Active</MenuItem>
                         <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
               </FormControl>
               <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input value={filter.name} name="name" onChange={handleFilterChange} />
               </FormControl>
               <FormControl>
                    <InputLabel>Category Name</InputLabel>
                    <Input value={filter.category_name} name="category_name" onChange={handleFilterChange} />
               </FormControl>
               <FormControl>
                    <InputLabel>Create Date</InputLabel>
                    <Input type="date" value={filter.created_at} name="created_at" onChange={handleFilterChange} />
               </FormControl>
               <FormControl>
                    <InputLabel>Update Date</InputLabel>
                    <Input type="date" value={filter.updated_at} name="updated_at" onChange={handleFilterChange} />
               </FormControl>
               <Button onClick={fetchItemsFilter}>Apply Filter</Button>
               <TableContainer component={Paper}>
                    <Table>
                         <TableHead>
                              <TableRow>
                                   <TableCell>ID</TableCell>
                                   <TableCell>Status</TableCell>
                                   <TableCell>Name</TableCell>
                                   <TableCell>Category Name</TableCell>
                                   <TableCell>Create Date</TableCell>
                                   <TableCell>Update Date</TableCell>
                                   <TableCell>Actions</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {items.map((item) => (
                                   <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.category_name}</TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell>{item.updated_at}</TableCell>
                                        <TableCell>
                                             <Button onClick={() => toggleItemForm(item.id)}>Edit</Button>
                                             <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
               {showItemForm && <ItemForm editItemId={editItemId} onClose={handleItemFormClose} onSubmit={handleItemFormSubmit} />}
               <Pagination itemsPerPage={10} totalItems={totalItems} paginate={paginate} currentPage={currentPage} />
          </div>
     );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
     const pageNumbers = [];

     for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
          pageNumbers.push(i);
     }

     return (
          <nav>
               <ul className="pagination">
                    {pageNumbers.map((number) => (
                         <li key={number} className={number === currentPage ? "active" : ""}>
                              <Button onClick={() => paginate(number)}>{number}</Button>
                         </li>
                    ))}
               </ul>
          </nav>
     );
};

export default ItemList;
