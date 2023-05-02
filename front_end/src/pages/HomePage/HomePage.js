import React from "react";
import Navbar from "../../components/common/NavBar";
import Search from "../../components/common/Search";
import VocabularyInfo from "../../components/vocabulary/VocabularyInfo";
import "./HomePage.css";
import bgImg from "../../assets/images/OIG.jpg";

const HomePage = () => {
    return (
        <div className="home-page" >
            <Navbar/>
            <Search/>
            <div className="home-page__word-container">
                <VocabularyInfo/>
            </div>
        </div>
        
    );
}


export default HomePage;