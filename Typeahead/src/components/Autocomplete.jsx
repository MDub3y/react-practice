/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import SuggestionsList from "./suggestions";
import debounce from "lodash/debounce";

const Autocomplete = ({
  staticData,
  fetchSuggestions,
  placeholder = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue?.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          style={customStyles}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={handleInputChange}
        />
        {(suggestions.length > 0 || loading || error) && (
          <ul className="suggestion-list">
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">{customLoading}</div>}
            <SuggestionsList
              dataKey={dataKey}
              highlight={inputValue}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          </ul>
        )}
      </div>
    </>
  );
};

export default Autocomplete;
