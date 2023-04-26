import React, { useState } from "react";
import "../../assets/styles/common/Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("japanese-to-vietnamese");
  const [suggestions, setSuggestions] = useState([]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    // TODO: fetch suggestions from API based on keyword
    // setSuggestions(response.data);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchClick = () => {
    // TODO: dispatch search action with keyword and searchType
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    // TODO: dispatch search action with suggestion and searchType
  };

  return (
    <div className="search">
      <div className="search__input">
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="japanese-to-vietnamese">Nhật-Việt</option>
          <option value="vietnamese-to-japanese">Việt-Nhật</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button onClick={handleSearchClick}>Tìm kiếm</button>
      </div>
      <div className="search__suggestions">
        {suggestions.map((suggestion) => (
          <button key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;