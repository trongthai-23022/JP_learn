import React, { useState, useRef } from "react";
import "../../assets/styles/common/Search.css";
import { useNavigate } from 'react-router-dom';
import CanvasDraw from "@win11react/react-canvas-draw";
import { BiEdit, BiEraser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("japanese-to-vietnamese");
  const [suggestions, setSuggestions] = useState([]);
  const [showHandwriting, setShowHandwriting] = useState(false);
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);
  let result = [];
  const [displayedResults, setDisplayedResults] = useState([]);

  const navigate = useNavigate();

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
    if (keyword === "") return;
    navigate(`/search/detail/${keyword}`);
  };
  const keyPressEnter = (e) => {
    if ((e.key === 'Enter') & (keyword !== '')) {
      navigate(`/search/detail/${keyword}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    // TODO: dispatch search action with suggestion and searchType

  };


  const handleBackButtonClick = () => {
    canvasRef.current.undo();
  };

  const handleClearButtonClick = () => {
    canvasRef.current.clear();
  };

  const handleToggleHandwriting = () => {
    setShowHandwriting(!showHandwriting);
  };
  const handleChangeHandwriting = () => {
    if (canvasRef.current) {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
      const imageData = canvasRef.current.canvas.drawing.toDataURL();
      console.log(imageData);
      const base64Data = imageData.split(',')[1];
      const formData = new FormData();
      formData.append('data', base64Data);


      axios.post("http://127.0.0.1:5000/model", formData)
        .then(response => {
          // Xử lý kết quả từ API trả về
          result = response.data.Kanji;
          console.log(result);
          const displayedResults = result.map((item, i) => (
            <span className="result-item" onClick={() => setKeyword(item)} key={i}>
            {item}
          </span>
          ));
          setDisplayedResults(displayedResults);
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });

    },1000);
    }
  };

  return (
    <div className="search_container">
      <div className="search__type">
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="japanese-to-vietnamese">Nhật-Việt</option>
          <option value="vietnamese-to-japanese">Việt-Nhật</option>
        </select>
      </div>
      <div className="search">
        <div className="search__input">

          <input
            type="text"
            placeholder="Tìm kiếm"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyPress={keyPressEnter}

          />
          <div className="search__right-items">
            <button onClick={handleToggleHandwriting} className="search__button-edit" >
              <BiEdit />
            </button>
            <button onClick={handleSearchClick} className="search__button-edit" >
              <BsSearch />
            </button>
          </div>

        </div>
        <div className="search__suggestions">
          {suggestions.map((suggestion) => (
            <button key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>

        {showHandwriting && (
          <div className="search__handwriting">

            <div className="search_handwriting_canvas__top">
              <button onClick={handleBackButtonClick} className="search_handwriting_canvas__top__button"><RiArrowGoBackFill /></button>
              <button onClick={handleClearButtonClick} className="search_handwriting_canvas__top__button"><BiEraser /></button>
              {/* TODO: Phần này sẽ trả về các ký tự được dự đoán */}
              <div className='search_handwriting_canvas__top__result'>
                {displayedResults}
                大好き
              </div>
            </div>
            <CanvasDraw
              className="canvas__draw__handwriting"
              ref={canvasRef}
              brushColor="#000000"
              canvasWidth="100%"
              canvasHeight="200px"
              brushRadius={3}
              lazyRadius={0}
              onChange={handleChangeHandwriting}
              backgroundColor="#ffffff"
              hideGrid={true}
            />

          </div>
        )}



      </div>
    </div>
  );
};

export default Search;
