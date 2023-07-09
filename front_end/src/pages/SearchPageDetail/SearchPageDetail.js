import React, { useState } from "react";
import {
    ButtonGroup,
    Button,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import Navbar from "../../components/common/NavBar";
import Search from "../../components/common/Search";
import VocabularyInfo from "../../components/vocabulary/VocabularyInfo";
import { useParams } from "react-router-dom";
import "./SearchPageDetail.css";
import WordInfo from "../../components/vocabulary/WordInfo";
import { useEffect } from "react";
import api from "../../api/apiConfig";

const SearchPageDetail = () => {
    const { word } = useParams();
    const [searchType, setSearchType] = useState("kanji");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // post api /me to get user info
            api.post('/me')
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                }
                )
                .catch((error) => {
                    console.error('Error fetching user info:', error);

                }
                );
        }
        else {
        }
    }, []);

    const handleSearchTypeChange = (event, newSearchType) => {
        if (newSearchType !== null) {
            setSearchType(newSearchType);
        }
    };

    return (
        <div className="SearchPageDetail__container">
            <Navbar user= {user}/>
            <Search />
            <div className="SearchPageDetail__content">
                <div className="SearchPageDetail__searchType">
                    <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <ToggleButtonGroup
                            value={searchType}
                            color="primary"
                            exclusive
                            aria-label="Platform"
                            onChange={handleSearchTypeChange}

                        >
                            <ToggleButton value="kanji" style={{ backgroundColor: 'white' }}>Kanji</ToggleButton>
                            <ToggleButton value="word" style={{ backgroundColor: 'white' }}> Từ vựng</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonGroup>
                </div>
                <div className="SearchPageDetail__info">
                    {searchType === "kanji" && <VocabularyInfo kanji={word} />}
                    {searchType === "word" && <WordInfo word={word} />}
                </div>
            </div>

        </div>
    );
};

export default SearchPageDetail;
