import React from 'react';
import Quiz from '../../components/myword/Quiz';

const QuizPage = () => {
    const vocabularyData = [
        { id: 1, word: 'Word 1', meaning: 'Meaning 1' },
        { id: 2, word: 'Word 2', meaning: 'Meaning 2' },
        { id: 3, word: 'Word 3', meaning: 'Meaning 3' },
        { id: 4, word: 'Word 4', meaning: 'Meaning 4' },
        { id: 5, word: 'Word 5', meaning: 'Meaning 5' },
    ];
    return (
        <Quiz vocabularyData={vocabularyData} />
    );
    }

export default QuizPage;
