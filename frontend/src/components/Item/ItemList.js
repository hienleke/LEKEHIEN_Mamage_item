import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import "./ItemList.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import api from "../../services/api";
import { fetchToken } from "../../services/api";

const ItemList = () => {
     const [items, setItems] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalItems, setTotalItems] = useState(0);

     const [showItemForm, setShowItemForm] = useState(false);
     const [editItemId, setEditItemId] = useState(null);

     const fetchItems = async () => {
          try {
               await fetchToken();
               const response = await api.get(`/items/filter?page=${currentPage}`);
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
                    await api.put(`/items/${editItemId}`, formData);
               } else {
                    // Create new item
                    await fetchToken();
                    await api.post("/items", formData);
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

     useEffect(() => {
          fetchItems();
     }, [currentPage]);

     return (
          <div>
               <h2>Items</h2>
               <Button onClick={() => toggleItemForm()}>Add Item</Button>
               <TableContainer component={Paper}>
                    <Table>
                         <TableHead>
                              <TableRow>
                                   <TableCell>ID</TableCell>
                                   <TableCell>Name</TableCell>
                                   <TableCell>Description</TableCell>
                                   <TableCell>Price</TableCell>
                                   <TableCell>Status</TableCell>
                                   <TableCell>Action</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {items.map((item) => (
                                   <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                             <Button onClick={() => toggleItemForm(item.id)}>Edit</Button>
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
