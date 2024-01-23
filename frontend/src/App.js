import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./components/Item/ItemList";

const App = () => {
     return (
          <Router>
               <div>
                    <Routes>
                         <Route path="/item" element={<ItemList />} />
                         {/* Add more routes as needed */}
                         <Route path="/" element={<ItemList />} />
                    </Routes>
               </div>
          </Router>
     );
};

export default App;
