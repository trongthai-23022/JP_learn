import React, { useState } from "react";
import Navbar from "../../components/common/NavBar";
import { Grid, Card, CardContent, Typography, IconButton, Button } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Navigate, useNavigate } from 'react-router-dom';
import "./MyWord.css";
import api from "../../api/apiConfig";
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const MyWord = () => {
    const navigate = useNavigate();
    // State để lưu trữ thư mục và các lesson tương ứng

    const [open, setOpen] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
   

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

    //fetch data from api

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(`/study_histories/1`);
                console.log(response.data);
                setFolders(response.data);
            } catch (error) {
                console.log(error);
            } finally {

            }
        };
        fetchData();
        
       
        if (reloadData) {
            
            // Đánh dấu là đã tải lại dữ liệu
            setReloadData(false); // Đánh dấu là đã tải lại dữ liệu
            
        }
    }, [reloadData]);



    // State để lưu trữ thư mục được chọn
    

    // Hàm xử lý sự kiện khi click vào thư mục
    const handleFolderClick = (folder) => {
        setSelectedFolder(folder);
    };

    // Hàm xử lý sự kiện khi click vào nút "Thêm thư mục"
    const handleAddFolder = () => {
        const newFolder = {
            name: 'Thư mục mới',
            description: 'Mô tả thư mục mới',
            lessons: []
        };

        // Gửi yêu cầu tạo thư mục mới đến API
        api.post('/folders', {
            //post data
            name: newFolder.name,
            description: newFolder.description,

        })
            .then(response => {
                console.log(response.data);
                setReloadData(true);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi tạo thư mục mới:', error);
                // Unauthorized
                if (error.response === 401) {
                    Navigate('/signin');
                }
            }
            );

    };

    // Hàm xử lý sự kiện khi click vào nút "Thêm lesson"
    const handleAddLesson = (id) => {
        if (selectedFolder) {
            const newLesson = {
                name: "Lesson mới",
                description: "Mô tả lesson mới",
            };

            api.post('/lessons', {
                //post data
                folder_id: id,
                name: newLesson.name,
                description: newLesson.description,
    
            })
                .then(response =>{
                    console.log(response.data);
                    setReloadData(true);

                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error('Lỗi khi tạo thư mục mới:', error);
                    // Unauthorized
                    if (error.response === 401) {
                        Navigate('/signin');
                    }
                }
                );
        }
    };

    const handleLessonClick = (lessonId) => {
        navigate(`/lesson/${lessonId}`);
        setSelectedLesson(lessonId);
    };


    
    const [IdEit,setIdEdit] = useState(null);

    const handleEditFolder = (id) => {
        console.log("Edit folder");
        setOpen(true);
    };
    const handleEditLesson  = (id) => {
        console.log("Edit lesson");
        setIdEdit(id);
        setSelectedLesson(id);
        setOpenLesson(true);
    };

    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');

    const [lessonName, setLessonName] = useState('');
    const [lessonDescription, setLessonDescription] = useState('');

    const handleFolderNameChange = (event) => {
        setFolderName(event.target.value);
    };
    const handleLessonNameChange = (event) => {
        setLessonName(event.target.value);
    };

    const handleFolderDescriptionChange = (event) => {
        setFolderDescription(event.target.value);
    };
    const handleLessonDescriptionChange = (event) => {
        setLessonDescription(event.target.value);
    };

    const handleClickSave = () => {
        // Thực hiện logic cần thiết, ví dụ:
        console.log('Folder name:', folderName);
        console.log('Description:', folderDescription);
        // Gọi API hoặc thực hiện các thao tác khác tại đây
        api.put(`/folders/${selectedFolder.id}`, {
            name: folderName,
            description: folderDescription,
          })
            .then(response => {
              // Xử lý phản hồi thành công nếu cần
              console.log('Thông tin thư mục đã được cập nhật thành công');
              // Thực hiện các thao tác khác sau khi cập nhật thành công
              setReloadData(true); // Kích hoạt fetch lại dữ liệu
            })
            .catch(error => {
              // Xử lý lỗi nếu có
              console.error('Lỗi khi cập nhật thông tin thư mục:', error);
            });
      
        // Sau khi hoàn thành, đóng dialog
        handleClose();
      };
    
    const handleClickSaveLesson = () => {
        // Thực hiện logic cần thiết, ví dụ:
        console.log('Lesson name:', lessonName);
        console.log('Description:', lessonDescription);
        // Gọi API hoặc thực hiện các thao tác khác tại đây
        console.log(IdEit);
        api.post(`/lessons/${IdEit}`, {
            name: lessonName,
            description: lessonDescription,
            })
            .then(response => {
                // Xử lý phản hồi thành công nếu cần
                console.log('Thông tin lesson đã được cập nhật thành công');
                // Thực hiện các thao tác khác sau khi cập nhật thành công
                setReloadData(true); // Kích hoạt fetch lại dữ liệu
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật thông tin lesson:', error);
            });

        // Sau khi hoàn thành, đóng dialog
        handleCloseLesson();
    };
    
    const handleDeleteFolder = (id) => {
        // Gọi API hoặc thực hiện các thao tác khác tại đây
        api.delete(`/folders/${id}`)
            .then(response => {
                // Xử lý phản hồi thành công nếu cần
                console.log('Xóa thư mục thành công');
                // Thực hiện các thao tác khác sau khi xóa thành công
                setReloadData(true); // Kích hoạt fetch lại dữ liệu
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi xóa thư mục:', error);
            });
        
    };
    const handleDeleteLesson = (id) => {
        // Gọi API hoặc thực hiện các thao tác khác tại đây
        api.delete(`/lessons/${id}`)
            .then(response => {
                // Xử lý phản hồi thành công nếu cần
                console.log('Xóa lesson thành công');
                // Thực hiện các thao tác khác sau khi xóa thành công
                setReloadData(true); // Kích hoạt fetch lại dữ liệu
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi xóa lesson:', error);
            });

    };
      

    const handleClose = () => {
        setOpen(false);
    };


    const [openLesson, setOpenLesson] = useState(false);

    const handleCloseLesson = () => {
        setOpenLesson(false);
    };

    return (

        <div className="component-container">
            <Navbar />
            <div className="my-word__container">
                {open && (
                    <div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Edit</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Thay đổi thông tin cho thư mục
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Folder name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={folderName}
                                    onChange={handleFolderNameChange}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={folderDescription}
                                    onChange={handleFolderDescriptionChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClickSave}>Save</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
                {openLesson && (
                    <div>
                        <Dialog open={openLesson} onClose={handleCloseLesson}>
                            <DialogTitle>Edit</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Thay đổi thông tin cho lesson
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Lesson name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={lessonName}
                                    onChange={handleLessonNameChange}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={lessonDescription}
                                    onChange={handleLessonDescriptionChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseLesson}>Cancel</Button>
                                <Button onClick={handleClickSaveLesson}>Save</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
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
                                    onClick={()=>handleEditFolder(folder.id)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    sx={{ position: "absolute", bottom: "5px", right: "5px" }}
                                    onClick={()=>handleDeleteFolder(folder.id)}
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
                                            
                                        >
                                            <CardContent
                                            onClick={() => handleLessonClick(lesson.id)}>
                                                
                                                <Typography variant="h6">{lesson.name}</Typography>
                                                <Typography variant="body2">{lesson.description}</Typography>
                                                
                                            </CardContent>
                                            <IconButton
                                                sx={{ position: "absolute", top: "5px", right: "5px" }}
                                                onClick={() => handleEditLesson(lesson.id)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                sx={{ position: "absolute", bottom: "5px", right: "5px" }}
                                                onClick={() => handleDeleteLesson(lesson.id)}
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
                                            onClick={()=>handleAddLesson(selectedFolder.id)}
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
