import React from "react";
import Navbar from "../../components/common/NavBar";
import Search from "../../components/common/Search";
import VocabularyInfo from "../../components/vocabulary/VocabularyInfo";

const SeachPageDetail = () => {
    return (
        <div className="SeachPageDetail__contain">
            <Navbar />
            <Search />
            <VocabularyInfo />
        </div>
    );
}

export default SeachPageDetail;
