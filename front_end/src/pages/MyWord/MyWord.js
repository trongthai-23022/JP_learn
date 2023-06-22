import React, { useState } from "react";
import Navbar from "../../components/common/NavBar";
import { Grid, Card, CardContent, Typography, IconButton, Button } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import "./MyWord.css";

const MyWord = () => {
    const navigate = useNavigate();
    // State để lưu trữ thư mục và các lesson tương ứng
    const [folders, setFolders] = useState([
        {
            name: "Thư mục 1",
            description: "Mô tả thư mục 1",
            lessons: [
                { id: "lesson1", name: "Lesson 1", description: "Mô tả lesson 1" },
                { id: "lesson2", name: "Lesson 2", description: "Mô tả lesson 2" },
                { id: "lesson3", name: "Lesson 3", description: "Mô tả lesson 3" },
            ],
        },
        {
            name: "Thư mục 2",
            description: "Mô tả thư mục 2",
            lessons: [
                { id: "lesson4", name: "Lesson 4", description: "Mô tả lesson 4" },
                { id: "lesson5", name: "Lesson 5", description: "Mô tả lesson 5" },
            ],
        },
        { name: "Thư mục 3", description: "Mô tả thư mục 3", lessons: [] },
    ]);

    // State để lưu trữ thư mục được chọn
    const [selectedFolder, setSelectedFolder] = useState(null);

    // Hàm xử lý sự kiện khi click vào thư mục
    const handleFolderClick = (folder) => {
        setSelectedFolder(folder);
    };

    // Hàm xử lý sự kiện khi click vào nút "Thêm thư mục"
    const handleAddFolder = () => {
        const newFolder = {
            name: "Thư mục mới",
            description: "Mô tả thư mục mới",
            lessons: [],
        };

        setFolders([...folders, newFolder]);
    };

    // Hàm xử lý sự kiện khi click vào nút "Thêm lesson"
    const handleAddLesson = () => {
        if (selectedFolder) {
            const newLesson = {
                id: `lesson${selectedFolder.lessons.length + 1}`,
                name: "Lesson mới",
                description: "Mô tả lesson mới",
            };

            const updatedFolders = folders.map((folder) => {
                if (folder === selectedFolder) {
                    return {
                        ...folder,
                        lessons: [...folder.lessons, newLesson],
                    };
                }
                return folder;
            });

            setFolders(updatedFolders);
        }
    };

    const handleLessonClick = (lessonId) => {
        navigate(`/lesson/${lessonId}`);
    };

    return (
        <div className="component-container">
            <Navbar />
            <div className="my-word__container">
            <Grid container spacing={2} sx={{ padding: "20px" }}>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="h5" gutterBottom>
                        Thư mục
                    </Typography>
                    {folders.map((folder, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            onClick={() => handleFolderClick(folder)}
                            sx={{ cursor: "pointer", position: "relative" }}
                        >
                            <CardContent>
                                <Typography variant="h6">{folder.name}</Typography>
                                <Typography variant="body2">{folder.description}</Typography>
                            </CardContent>
                            <IconButton
                                sx={{ position: "absolute", top: "5px", right: "5px" }}
                                onClick={() => console.log("Edit folder")}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                sx={{ position: "absolute", bottom: "5px", right: "5px" }}
                                onClick={() => console.log("Delete folder")}
                            >
                                <Delete />
                            </IconButton>
                        </Card>
                    ))}
                    <Card variant="outlined" sx={{ cursor: "pointer", position: "relative" }}>
                        <CardContent>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleAddFolder}
                                sx={{ width: "100%" }}
                            >
                                Thêm thư mục
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                    {selectedFolder ? (
                        <div>
                            <Typography variant="h5" gutterBottom>
                                {selectedFolder.name}
                            </Typography>
                            {selectedFolder.lessons.length > 0 ? (
                                selectedFolder.lessons.map((lesson, index) => (
                                    <Card
                                        key={index}
                                        variant="outlined"
                                        sx={{ cursor: "pointer", position: "relative" }}
                                        onClick={() => handleLessonClick(lesson.id)}
                                    >
                                        <CardContent>
                                            <Typography variant="h6">{lesson.name}</Typography>
                                            <Typography variant="body2">{lesson.description}</Typography>
                                        </CardContent>
                                        <IconButton
                                            sx={{ position: "absolute", top: "5px", right: "5px" }}
                                            onClick={() => console.log("Edit lesson")}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            sx={{ position: "absolute", bottom: "5px", right: "5px" }}
                                            onClick={() => console.log("Delete lesson")}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Card>
                                ))
                            ) : (
                                <Typography variant="body2">Không có lesson</Typography>
                            )}
                            <Card variant="outlined" sx={{ cursor: "pointer", position: "relative" }}>
                                <CardContent>
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={handleAddLesson}
                                        sx={{ width: "100%" }}
                                    >
                                        Thêm lesson
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Typography variant="body2">Chọn một thư mục</Typography>
                    )}
                </Grid>
            </Grid>
        </div>
        </div>
    );
};

export default MyWord;
