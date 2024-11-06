import React from "react";
import '../style/SearchBar.css'
import {useEffect, useState} from "react";

const SearchBar = ({setResult}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/data/db.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    const [input, setInput] = useState("");
    const fetchData = (value) => {
        const results = data.tickets.filter((item) => 
            item.nazDog?.toLowerCase().includes(value.toLowerCase())
            || item.vrsDog?.toLowerCase().includes(value.toLowerCase())
            || item.mjesto?.toLowerCase().includes(value.toLowerCase())
        );
        setResult(results)
        console.log(results)
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    };

    return (
        <div className="searchArea">
            <div className="searchBar">
                <img src= "./images/search-svgrepo-com.svg" alt ="magnifierGlass"></img>
                <input type="text" value={input} onChange = {(e) => handleChange(e.target.value)}
                placeholder="Pretraži događaje"/>
            </div>
        </div>
    );
}
export default SearchBar;
