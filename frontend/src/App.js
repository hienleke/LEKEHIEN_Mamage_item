import "./App.css";
import ItemForm from "./components/ItemForm";
import IteamList from "./components/ItemList";

function App() {
     return (
          <div className="App">
               <div className="container">
                    <ItemForm />
                    <IteamList />
               </div>
          </div>
     );
}

export default App;
