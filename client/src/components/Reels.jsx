import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReels, likeReel, deleteReel } from '../state/Reels/reels.action';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import VideocamIcon from '@mui/icons-material/Videocam';
import { createReel } from '../state/Reels/reels.action';

const Reels = () => {
    const dispatch = useDispatch();
    const { reels, loading } = useSelector((state) => state.reels);
    const currentUser = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);
    const [reelData, setReelData] = useState({
        title: '',
        video: '',
        caption: ''
    });

    useEffect(() => {
        dispatch(getAllReels());
    }, [dispatch]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateReel = () => {
        dispatch(createReel({ data: reelData }));
        handleClose();
        setReelData({ title: '', video: '', caption: '' });
    };

    const handleLikeReel = (reelId) => {
        dispatch(likeReel(reelId));
    };

    const handleDeleteReel = (reelId) => {
        dispatch(deleteReel(reelId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <Box className="flex justify-between items-center mb-5">
                <Typography variant="h5">Reels</Typography>
                <Button
                    variant="contained"
                    startIcon={<VideocamIcon />}
                    onClick={handleOpen}
                >
                    Create Reel
                </Button>
            </Box>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reels.map((reel) => (
                    <Card key={reel.id}>
                        <CardMedia
                            component="video"
                            height="400"
                            src={reel.video}
                            controls
                        />
                        <CardContent>
                            <Typography variant="h6">{reel.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {reel.caption}
                            </Typography>
                            <Box className="flex justify-between items-center mt-2">
                                <IconButton
                                    onClick={() => handleLikeReel(reel.id)}
                                    color="primary"
                                >
                                    {reel.likedBy?.includes(currentUser?.id) ? (
                                        <FavoriteIcon />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                </IconButton>
                                {reel.user?.id === currentUser?.id && (
                                    <IconButton
                                        onClick={() => handleDeleteReel(reel.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Reel</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={reelData.title}
                        onChange={(e) =>
                            setReelData({ ...reelData, title: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Video URL"
                        fullWidth
                        value={reelData.video}
                        onChange={(e) =>
                            setReelData({ ...reelData, video: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Caption"
                        fullWidth
                        multiline
                        rows={4}
                        value={reelData.caption}
                        onChange={(e) =>
                            setReelData({ ...reelData, caption: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateReel} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Reels;