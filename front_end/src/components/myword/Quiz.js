import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Box, Typography, IconButton, Button } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";
import '../../assets/styles/myword/Quiz.css';


const Quiz = ({ vocabularyData, handleCloseModal }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayedAnswers, setDisplayedAnswers] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [finalTime, setFinalTime] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        // Shuffle the vocabulary data
        const shuffledData = shuffleArray(vocabularyData);

        // Take the first 5 shuffled items as questions
        const selectedQuestions = shuffledData.slice(0, 10);

        // Generate random answers for each question
        const processedQuestions = selectedQuestions.map(question => {
            const correctAnswer = question.vietnamese_word;
            const incorrectOptions = generateIncorrectOptions(vocabularyData, correctAnswer, 3);
            const allOptions = shuffleArray([correctAnswer, ...incorrectOptions]);

            return {
                ...question,
                options: allOptions,
            };
        });

        setQuestions(processedQuestions);
    }, [vocabularyData]);

    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            setDisplayedAnswers(currentQuestion.options);
        }
    }, [currentQuestionIndex, questions]);

    const shuffleArray = array => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const generateIncorrectOptions = (data, correctAnswer, count) => {
        const filteredData = data.filter(item => item.vietnamese_word !== correctAnswer);
        const shuffledData = shuffleArray(filteredData);
        return shuffledData.slice(0, count).map(item => item.vietnamese_word);
    };

    const handleAnswerSelect = answer => {
        console.log('handleAnswerSelect', isAnswered);
        if (!isAnswered) {
            setSelectedAnswer(answer);
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = currentQuestion.vietnamese_word === answer;
            setIsCorrect(isCorrect);
            setIsAnswered(true);
            if (currentQuestionIndex >= questions.length - 1) {
                setIsQuizCompleted(true);
                setFinalTime(timer);
            }

            if (isCorrect) {
                setCorrectCount(prevCount => prevCount + 1);
            }
        }
    };

    const handleNextQuestion = () => {
        console.log(isQuizCompleted)
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer('');
            setIsAnswered(false);
            setIsCorrect(false);

        } else {
            //If completed all questions, close the modal

            handleCloseModal();

        }

    };

    return (
        <Box p={2} height="100%" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#939bb4",
        }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 1,
                }}
            >
                <IconButton onClick={handleCloseModal}>
                    <ArrowBack />
                </IconButton>
            </Box>
            <Box sx={{
                width: "80vw",
                height: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fffff0",
                borderRadius: "8px",
            }}>
                <Grid container spacing={2} height="100%" padding="20px">
                    <Grid item xs={8} >
                        <Typography variant="h5" gutterBottom>
                            Câu hỏi {currentQuestionIndex + 1} / {questions.length}:
                        </Typography>
                        {currentQuestionIndex < questions.length && (
                            <Card variant="outlined" style={{ height: `500px`, display: `flex`, justifyContent: `center`, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography variant="h4" sx={{ color: 'red' }}>{questions[currentQuestionIndex].japanese_word}</Typography>
                                </CardContent>
                            </Card>
                        )}

                        <Typography variant="h5" gutterBottom>
                            Lựa chọn đáp án:
                        </Typography>
                        <Grid container spacing={2}>
                            {displayedAnswers.map((answer) => (
                                <Grid item xs={6} key={answer}>
                                    <Card
                                        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                                        variant="outlined"
                                        onClick={() => handleAnswerSelect(answer)}
                                        className={`answer-card ${isAnswered && selectedAnswer === answer
                                            ? isCorrect
                                                ? 'correct-answer'
                                                : 'wrong-answer'
                                            : ''
                                            }`}
                                    >
                                        <CardContent>
                                            <Typography variant="body1" noWrap style={{ maxWidth: '100%' }}>{answer}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {isAnswered && (
                            <div>
                                {isCorrect ? (
                                    <Typography variant="body1" className="feedback-correct">
                                        Đúng!
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" className="feedback-wrong">
                                        Sai! Đáp án chính xác là: {questions[currentQuestionIndex].meaning}
                                    </Typography>
                                )}

                                {currentQuestionIndex < questions.length - 1 ? (
                                    <Button variant="contained" color="success" onClick={handleNextQuestion}>
                                        Tiếp theo
                                    </Button>
                                ) : (

                                    <Button variant="contained" color="secondary" onClick={handleNextQuestion}>
                                        Hoàn thành
                                    </Button>
                                )}
                            </div>
                        )}
                    </Grid>

                    <Grid item xs={4} >
                        <Box p={2} height="25vh" width="auto">
                            <div>
                                <div>
                                    <Typography variant="h6">Thời gian:</Typography>
                                    {isQuizCompleted ? (
                                        <Typography variant="body1" style={{ color: 'red' }}>{finalTime} giây</Typography>
                                    ) : (
                                        <Typography variant="body1" style={{ color: 'green' }}>{timer} giây</Typography>
                                    )}

                                </div>
                                <div>
                                    <Typography variant="h6">Số câu đúng:</Typography>
                                    <Typography variant="body1">{correctCount}</Typography>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};


export default Quiz;
