import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/NavBar';
import { Grid, Card, CardContent, Typography, Modal } from '@mui/material';
import FlashCardIcon from '@mui/icons-material/FlashOn';
import QuizIcon from '@mui/icons-material/Quiz';
import DrawIcon from '@mui/icons-material/Draw';
import FlashCard from '../../components/myword/FlashCard';
import Quiz from '../../components/myword/Quiz';
import './LessonDetail.css';
import { useNavigate } from 'react-router-dom';
import WriteTest from '../../components/myword/WriteTest';
import api from '../../api/apiConfig';


const LessonDetail = () => {
    const { lessonId } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [isWriteTestModalOpen, setIsWriteTestModalOpen] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const navigate = useNavigate();


    useEffect
        (() => {    
            const fetchLesson = async () => {
                try {
                    const response = await api.get(`/lessons/${lessonId}`);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching lesson data:', error);
                }
            };
            fetchLesson();
        }, []);


    const handleOpenWriteTestModal = () => {
        setIsWriteTestModalOpen(true);
    };

    const handleCloseWriteTestModal = () => {
        setIsWriteTestModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleQuizClick = () => {
        setIsQuizModalOpen(true);
        setCurrentCardIndex(0); // Đặt lại câu hỏi về câu hỏi đầu tiên
    };
    const handleCloseQuizModal = () => {
        setIsQuizModalOpen(false); // Đóng modal Quiz
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const vocabularyData = [
        { id: 1, word: '間', meaning: 'Giữa' },
        { id: 2, word: '味', meaning: 'Gia vị' },
        { id: 3, word: '石', meaning: 'Đá' },
        { id: 4, word: '糸', meaning: 'Chỉ' },
        { id: 5, word: '腕', meaning: 'Cánh tay' },
    ];



    return (
        <div className="lesson-container">
            <Navbar />
            <div className="container">
                <Typography variant="h3" gutterBottom>
                    Tên lesson
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} className="gridItem">
                        <Card variant="outlined" onClick={handleOpenModal}>
                            <CardContent>
                                <div className="cardContent">
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Flash Card
                                    </Typography>
                                    <FlashCardIcon />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} className="gridItem">
                        <Card variant="outlined" onClick={handleQuizClick}>
                            <CardContent>
                                <div className="cardContent">
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Quizz
                                    </Typography>
                                    <QuizIcon />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} className="gridItem">
                        <Card variant="outlined" onClick={handleOpenWriteTestModal} sx={{ height: '100%' }}>
                            <CardContent>
                                <div className="cardContent">
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Write Test
                                    </Typography>
                                    <DrawIcon />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography variant="h4" gutterBottom>
                    Từ vựng và nghĩa
                </Typography>
                <Grid container spacing={2}>
                    {vocabularyData.map((vocabulary) => (
                        <Grid item xs={12} sm={6} md={4} key={vocabulary.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{vocabulary.word}</Typography>
                                    <Typography variant="body1">{vocabulary.meaning}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <FlashCard vocabularyData={vocabularyData} handleCloseModal={handleCloseModal} />
                </Modal>

                <Modal open={isQuizModalOpen} onClose={handleCloseQuizModal}>

                    <Quiz vocabularyData={vocabularyData} handleCloseModal={handleCloseQuizModal} />

                </Modal>

                <Modal open={isWriteTestModalOpen} onClose={handleCloseWriteTestModal}>
                    <WriteTest vocabularyData={vocabularyData} handleCloseModal={handleCloseWriteTestModal} />
                </Modal>

            </div>
        </div>
    );
};

export default LessonDetail;
