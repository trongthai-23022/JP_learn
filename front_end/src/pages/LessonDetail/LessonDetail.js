import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/NavBar';
import { Grid, Card, CardContent, Typography, Modal, Box } from '@mui/material';
import { IconButton } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
    const [ lesson,setLesson ] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [isWriteTestModalOpen, setIsWriteTestModalOpen] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [vocabularyData, setVocabularyData] = useState([
    ]);
    const navigate = useNavigate();


    useEffect
        (() => {
            const fetchLesson = async () => {
                api.post(`/lesson_vocabularies/${lessonId}`).then((response) => {
                    setVocabularyData(response.data);
                }
                )
                    .catch((error) => {
                        console.error('Error fetching lesson info:', error);
                        if (error.response.status === 500 || error.response.status === 401) {
                            navigate('/signin');
                        }
                    }
                    );
            };
            const fetchName = async () => {
                api.get(`/lessons/${lessonId}`).then((response) => {
                    console.log(response.data);
                    setLesson(response.data);
                    
                }
                )
                    .catch((error) => {
                        console.error('Error fetching lesson info:', error.response);
                        if (error.response.status === 500 || error.response.status === 401) {
                            navigate('/signin');
                        }
                    }
                    );
            };
            fetchName();
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

    const handleRemove = (vocabulary) => {
        api.delete(`lesson_vocabularies/lesson/${lessonId}/${vocabulary.id}`).then((response) => {
            const newVocabularyData = vocabularyData.filter((v) => v.id !== vocabulary.id);
            setVocabularyData(newVocabularyData);
        })
            .catch((error) => {
                console.error('Error deleting vocabulary:', error);
            });

    }

    const handleVocaClick = (vocabulary) => {
        navigate(`/search/detail/jp-vn/${vocabulary.japanese_word}`);
    }




    return (
        <div className="lesson-container">
            <Navbar />
            <div className="container">
                <Box sx={{ marginBottom: '10px', backgroundColor: '#6667AB', borderRadius: '5px', padding: '5px 20px 5px 20px', borderBottom: '2px solid white', width: 'fit-content', justifyContent: 'flex-start' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            color: 'white',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        {lesson?.name}
                    </Typography>
                </Box>



                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} className="gridItem" marginBottom="20px">
                        <Card variant="outlined" onClick={handleOpenModal} sx={{
                            boxShadow: 3,
                        }}>
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
                        <Card variant="outlined" onClick={handleQuizClick} sx={{
                            boxShadow: 3,
                        }}>
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
                        <Card variant="outlined" onClick={handleOpenWriteTestModal} sx={{

                            boxShadow: 3,
                        }}>
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

                <Box sx={{ marginBottom: '10px', backgroundColor: '#6667AB', borderRadius: '5px', padding: '5px 20px 5px 20px', borderBottom: '2px solid white', width: 'fit-content', justifyContent: 'flex-start' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            color: 'white',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        Từ vựng trong bài học
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {vocabularyData.map((vocabulary) => (
                        <Grid item xs={12} sm={6} md={4} key={vocabulary.id}>
                            <Card variant="outlined" sx={{ cursor: "pointer", position: "relative" }}>
                                <CardContent onClick={() => handleVocaClick(vocabulary)}>
                                    <Typography variant="h6" noWrap style={{ color: 'red', maxWidth: '100%' }}>{vocabulary.japanese_word}</Typography>
                                    <Typography variant="body1" noWrap style={{ maxWidth: '100%' }}>{vocabulary.vietnamese_word}</Typography>
                                </CardContent>
                                <IconButton
                                    sx={{ position: "absolute", top: "10px", right: "5px" }}
                                    onClick={() => handleRemove(vocabulary)}
                                >
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
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
