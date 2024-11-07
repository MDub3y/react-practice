/* eslint-disable no-unused-vars */
import "./App.css";
import Autocomplete from "./components/Autocomplete";

function App() {

  const staticData = [
    "apple",
    "banana",
    "berry",
    "orange",
    "grape",
    "mango",
    "melon",
    "berrl",
    "peach",
    "cherry",
    "plum",
  ];

  const fetchSuggestions = async (query) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if(!response.ok){
      throw new Error("Network Response was not OK");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <div>
      <h1>AutoComplete / TypeAhead</h1>
      <Autocomplete
        placeholder={"Enter Recipe"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
