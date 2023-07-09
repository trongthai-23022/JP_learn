import React from "react";
import Navbar from "../../components/common/NavBar";
import Search from "../../components/common/Search";
import VocabularyInfo from "../../components/vocabulary/VocabularyInfo";
import "./HomePage.css";
import bgImg from "../../assets/images/OIG.jpg";
import logoimg from "../../assets/images/logoEZ.png";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import api from "../../api/apiConfig";
import { CircularProgress } from "@mui/material";


const HomePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // post api /me to get user info
            api.post('/me')
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                    setLoading(false);
                }
                )
                .catch((error) => {
                    console.error('Error fetching user info:', error);
                    setLoading(false);
                }
                );
        }
        else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="loading-container" >
            {loading ? (
                <CircularProgress color="success" size={40}/> // Hoặc hiển thị một loader khác tùy chọn
            ) : (
                <React.Fragment>
                    <div className="home-page" >
                        <Navbar user={user} />
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
                </React.Fragment>
            )}

        </div>


    );
}


export default HomePage;
