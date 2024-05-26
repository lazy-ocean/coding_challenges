/// starter import React, { useState, useEffect, useRef } from 'react';
import "./style.css";

const getApiUrl = (req) =>
  `https://autocomplete.travelpayouts.com/places2?term=${req}&locale=en&types[]=country`;

const fetchCountryList = async (query) => {
  const API_URL = getApiUrl(query);
  const data = await fetch(API_URL);
  return await data.json();
};

export default function App() {
  const [inputValue, setInputValue] = useState(""); // string
  const [suggestions, setSuggestions] = useState([]); // string[];

  const getCountryList = async (query) => {
    const countryList = await fetchCountryList(query);
    setSuggestions(countryList);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    query ? getCountryList(query) : setSuggestions([]);
  };

  return (
    <div className="countryForm">
      <label htmlFor="countryInput">Start typing a country name</label>
      <input
        value={inputValue}
        onChange={handleInputChange}
        id="countryInput"
      />
      {suggestions && (
        <ul className="list">
          {suggestions.map(({ name, id }) => (
            <li key={id}>
              <button className="option" onClick={() => setInputValue(name)}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// JUST A BUNCH OF USEEFFECTS
import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const getApiUrl = (req) =>
  `https://autocomplete.travelpayouts.com/places2?term=${req}&locale=en&types[]=country`;

const fetchCountryList = async (query) => {
  const API_URL = getApiUrl(query);
  const data = await fetch(API_URL);
  return await data.json();
};

const WAIT_TIME = 2000;

export default function App() {
  const [inputValue, setInputValue] = useState(""); // string
  const [suggestions, setSuggestions] = useState([]); // string[];
  const [debouncedInput, setDebouncedInput] = useState(""); //string

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedInput(inputValue), WAIT_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  useEffect(() => {
    debouncedInput ? getCountryList(debouncedInput) : setSuggestions([]);
  }, [debouncedInput]);

  const getCountryList = async (query) => {
    const countryList = await fetchCountryList(query);
    setSuggestions(countryList);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    /*   query ? getCountryList(query) : setSuggestions([]); */
  };

  return (
    <div className="countryForm">
      <label htmlFor="countryInput">Start typing a country name</label>
      <input
        value={inputValue}
        onChange={handleInputChange}
        id="countryInput"
      />
      {suggestions && (
        <ul className="list">
          {suggestions.map(({ name, id }) => (
            <li key={id}>
              <button className="option" onClick={() => setInputValue(name)}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// HOOK
import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const getApiUrl = (req) =>
  `https://autocomplete.travelpayouts.com/places2?term=${req}&locale=en&types[]=country`;

const fetchCountryList = async (query) => {
  const API_URL = getApiUrl(query);
  const data = await fetch(API_URL);
  return await data.json();
};

const WAIT_TIME = 1500;

const useDebounce = (value) => {
  const [debouncedInput, setDebouncedInput] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedInput(value), WAIT_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedInput;
};

export default function App() {
  const [inputValue, setInputValue] = useState(""); // string
  const [suggestions, setSuggestions] = useState([]); // string[];
  /* const [debouncedInput, setDebouncedInput] = useState(''); //string */
  const debouncedInput = useDebounce(inputValue);

  useEffect(() => {
    debouncedInput ? getCountryList(debouncedInput) : setSuggestions([]);
  }, [debouncedInput]);

  const getCountryList = async (query) => {
    const countryList = await fetchCountryList(query);
    setSuggestions(countryList);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    /*   query ? getCountryList(query) : setSuggestions([]); */
  };

  return (
    <div className="countryForm">
      <label htmlFor="countryInput">Start typing a country name</label>
      <input
        value={inputValue}
        onChange={handleInputChange}
        id="countryInput"
      />
      {suggestions && (
        <ul className="list">
          {suggestions.map(({ name, id }) => (
            <li key={id}>
              <button className="option" onClick={() => setInputValue(name)}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
