import React from "react";
import Navbar from "../../components/common/NavBar";
import Search from "../../components/common/Search";
import VocabularyInfo from "../../components/vocabulary/VocabularyInfo";
import { useParams } from "react-router-dom";
import "./SearchPageDetail.css";

const SeachPageDetail = () => {
    const { kanji } = useParams();
    console.log(kanji);
    return (
        <div className="SeachPageDetail__contain">
            <Navbar />
            <Search />
            <VocabularyInfo kanji={kanji} />
        </div>
    );
}

export default SeachPageDetail;
