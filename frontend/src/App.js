import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryList from "./components/Category/CategoryList";
import ItemList from "./components/Item/ItemList";

const App = () => {
     return (
          <Router>
               <div>
                    <Routes>
                         <Route path="/categories" element={<CategoryList />} />
                         <Route path="/items" element={<ItemList />} />
                         {/* Add more routes as needed */}
                         <Route path="/" element={<ItemList />} />
                    </Routes>
               </div>
          </Router>
     );
};

export default App;
