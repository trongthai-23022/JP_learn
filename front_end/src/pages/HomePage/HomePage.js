import React from "react";
import Navbar from "../../components/common/NavBar";
import Search from "../../components/common/Search";
import VocabularyInfo from "../../components/vocabulary/VocabularyInfo";
import "./HomePage.css";
import bgImg from "../../assets/images/OIG.jpg";
import logoimg from "../../assets/images/logoEZ.png";

const HomePage = () => {
    return (
        <div className="home-page" >
            <Navbar />
            <div className="home-page__contain">
                <div className="home-page__logo">
                    <img src={logoimg} alt="logo" />
                    <p>JPLEARN</p>
                </div>
                <div className="home-page__search">
                    <Search />
                </div>
            </div>
            {/* <div className="home-page__word-container">
                <VocabularyInfo />
            </div> */}

        </div>

    );
}


export default HomePage;
