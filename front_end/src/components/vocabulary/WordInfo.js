import { useEffect, useState } from "react";
import api from "../../api/apiConfig";
import { Typography, Button, Modal, Box } from "@mui/material";
import Tree from './Tree';

const WordInfo = ({ word }) => {
    const [info, setInfo] = useState([]);
    const [wordMean, setWordMean] = useState(null);
    const [isDataNotFound, setIsDataNotFound] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('jwtToken');


    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };



    const handleAddWordLesson=(lesson)=>{ 
        console.log(lesson);
        console.log(wordMean);
        api.post('/lesson_vocabularies', { lesson_id: lesson.id, vocabulary_id:  wordMean.id})
            .then((response) => {
                console.log(response.data);
            }
            )
            .catch((error) => {
                console.error('Error adding word to lesson:', error);
            }
            );
    }


    useEffect(() => {
        const fetchData = async () => {
            setWordMean(null);
            setInfo([]);
            try {
                await api
                    .get(`/vocabularies/findByJapaneseWord/word/${word}`)
                    .then((response) => {
                        setWordMean(response.data);
                        const wordInfo = response.data.word_info.replace(/\\/g, "");
                        const wordInfoJson = JSON.parse(wordInfo);
                        setInfo(wordInfoJson[0].means);
                        console.log(wordInfoJson[0].means);
                        if (response.data === "") {
                            setIsDataNotFound(true);
                        } else {
                            setIsDataNotFound(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsDataNotFound(true);
                    });
            } catch (error) {
                console.error("Error fetching word data:", error);
            }
        };

        fetchData();
    }, [word]);

    return (
        <div className="VocabularyInfo__contain">

            {isDataNotFound && (
                <div
                    className="VocabularyInfo__notFound"
                    style={{ color: "red" }}
                >
                    Không tìm thấy kết quả
                </div>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        color: "red",
                    }}
                >
                    {wordMean && wordMean.japanese_word}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleModalOpen}
                    disabled={!token}
                >
                    +
                </Button>
            </Box>


            {Array.isArray(info) &&
                info.map((mean, meanIndex) => (
                    <div key={meanIndex}>
                        <Typography
                            variant="h6"
                            component="span"
                            style={{ color: "blue" }}
                        >
                            ◆ {mean.mean}
                        </Typography>
                        {Array.isArray(mean.examples) &&
                            mean.examples.map((example, exampleIndex) => (
                                <div
                                    key={exampleIndex}
                                    style={{ margin: "10px", marginLeft: "20px" }}
                                >
                                    <div>
                                        <Typography
                                            variant="body1"
                                            component="span"
                                            style={{ color: "red" }}
                                        >
                                            {example.content}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body1" component="span">
                                            {example.mean.charAt(0).toUpperCase() +
                                                example.mean.slice(1)}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}



            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: '80%',
                        height: '80%',
                        bgcolor: "#dadde7",
                        boxShadow: 24,
                        borderRadius: '10px',   
                        p: 4
                    }}
                ><Tree  handleCloseModal={handleModalClose} handleSave={handleAddWordLesson}/>
                    
                </Box>

            </Modal>
        </div>
    );
};

export default WordInfo;
