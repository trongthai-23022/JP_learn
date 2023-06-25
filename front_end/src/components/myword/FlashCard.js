import React, { useState } from "react";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const FlashCard = ({ vocabularyData, handleCloseModal }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const flashCard = vocabularyData[currentCardIndex];
    const [isFront, setIsFront] = useState(true);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % vocabularyData.length);
        setIsFront(true);
    };

    const handlePreviousCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + vocabularyData.length) % vocabularyData.length);
        setIsFront(true);
    };

    const handleFlipCard = () => {
        setIsFront((prevIsFront) => !prevIsFront);
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#939bb4",
            }}
        >
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
            <Box
                sx={{
                    width: "60vw",
                    height: "60vh",
                    transformStyle: "preserve-3d",
                    transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)",
                    transition: "transform 0.5s",

                }}
                onClick={handleFlipCard}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        // Thêm translateZ ở đây
                    }}
                >
                    <Typography variant="h6">{flashCard.word}</Typography>
                    
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transform: "rotateY(180deg) translateZ(0)", // Thêm translateZ ở đây
                    }}
                >
                    <Typography variant="body1">{flashCard.meaning}</Typography>
                    
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, marginTop: "20px", }
            }>
                <Button variant="outlined" onClick={handlePreviousCard} sx={{
                    ml: 2,
                    color: "#ffffff",
                    backgroundColor: "#3f51b5",
                }}>
                    Previous
                </Button>
                <Button variant="outlined" onClick={handleNextCard} sx={{
                    ml: 2,
                    color: "#ffffff",
                    backgroundColor: "#3f51b5",
                }}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default FlashCard;
