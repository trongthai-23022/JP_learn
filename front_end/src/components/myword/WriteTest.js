import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Grid, Box, Typography, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { ArrowBack, Edit } from "@mui/icons-material";
import { RiArrowGoBackFill } from 'react-icons/ri';
import { BiPen, BiEraser } from 'react-icons/bi';
import '../../assets/styles/myword/Quiz.css';
import CanvasDraw from "@win11react/react-canvas-draw";

const WriteTest = ({ vocabularyData, handleCloseModal }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayedAnswers, setDisplayedAnswers] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [finalTime, setFinalTime] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const canvasRef = useRef(null);
    const [showHandwriting, setShowHandwriting] = useState(false);
    const answerRef = useRef(null);



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
            const correctAnswer = question.word;
          
            return {
              question: question.word,
              answer: correctAnswer,
            };
          });
          
          setQuestions(processedQuestions);
          
    }, [vocabularyData]);

    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            
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


    const handleAnswerSelect = answer => {
        if (!isAnswered) {
            
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = currentQuestion.answer === answerRef.current.value;
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
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            answerRef.current.value = '';
            if(showHandwriting){
                canvasRef.current.clear();}
            setIsAnswered(false);
            setIsCorrect(false);

        } else {
            //If completed all questions, close the modal

            handleCloseModal();

        }

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
                            <Card variant="outlined" style={{ height: `300px`, display: `flex`, justifyContent: `center`, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography variant="h6">{questions[currentQuestionIndex].question}</Typography>
                                </CardContent>
                            </Card>
                        )}

                        <Typography variant="h5" gutterBottom>
                            Viết lại từ trên vào ô bên dưới:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={10} >
                                <TextField
                                    id="outlined-basic"
                                    label="Đáp án"
                                    variant="outlined"
                                    fullWidth
                                    inputRef={answerRef}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={handleToggleHandwriting} startIcon={<BiPen />} size="small">
                                                    Write Hand
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} >
                                <Button onClick={handleAnswerSelect} variant="contained" color="success" fullWidth sx={{ height: '100%' }}>
                                    Kiểm tra
                                </Button>
                            </Grid>

                            {showHandwriting && (
                                <Grid item xs={12} >
                                    <div className="search__handwriting">

                                        <div className="search_handwriting_canvas__top">
                                            <button onClick={handleBackButtonClick} className="search_handwriting_canvas__top__button"><RiArrowGoBackFill /></button>
                                            <button onClick={handleClearButtonClick} className="search_handwriting_canvas__top__button"><BiEraser /></button>
                                            {/* TODO: Phần này sẽ trả về các ký tự được dự đoán */}
                                            <div className='search_handwriting_canvas__top__result'>
                                                Kí tự được trả về
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

                                            backgroundColor="#ffffff"
                                            hideGrid={true}
                                        />

                                    </div>
                                </Grid>
                            )}


                        </Grid>

                        {isAnswered && (
                            <div>
                                {isCorrect ? (
                                    <Typography variant="body1" className="feedback-correct">
                                        Đúng!
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" className="feedback-wrong">
                                        Sai! Đáp án chính xác là: {questions[currentQuestionIndex].answer}
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

export default WriteTest;
