import React from 'react';
import '../../assets/styles/vocabulary/VocabularyInfo.css';

const vocabularyEX = {
    title: 'từ vựng',
    description: 'asdasdasdasdasdasdasd',
}

const VocabularyInfo = ({ vocabulary }) => {
    vocabulary = vocabulary || vocabularyEX;
    console.log(vocabulary);
    return(
        <div className="vocabulary-info">
            <div className="vocabulary-info__title">
                <h2>Nghĩa của {vocabulary.title}</h2>
            </div>
            <div className="vocabulary-info__description">
                <p>{vocabulary.description}</p>
            </div>
        </div>
    );
}


export default VocabularyInfo;