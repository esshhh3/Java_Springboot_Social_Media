import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReels, likeReel, deleteReel } from '../state/Reels/reels.action';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const DEMO_REELS = [
  {
    id: 'demo1',
    title: 'Big Buck Bunny',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    caption: 'A sample bunny video',
    likedBy: [],
    user: { id: 'demoUser' }
  },
  {
    id: 'demo2',
    title: 'Bear Video',
    video: 'https://www.w3schools.com/html/movie.mp4',
    caption: 'A sample bear video',
    likedBy: [],
    user: { id: 'demoUser' }
  },
  {
    id: 'demo3',
    title: 'Sample Reel',
    video: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    caption: 'Another test reel',
    likedBy: [],
    user: { id: 'demoUser' }
  }
];

const Reels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reelsState = useSelector((state) => state.reels) || { reels: [], loading: false, error: null };
    const { reels, loading, error } = reelsState;
    const currentUser = useSelector((state) => state.auth.user);
    const videoRefs = useRef([]);

    useEffect(() => {
        dispatch(getAllReels());
    }, [dispatch]);

    const handleLikeReel = (reelId) => {
        dispatch(likeReel(reelId));
    };

    const handleDeleteReel = (reelId) => {
        dispatch(deleteReel(reelId));
    };

    const handleMouseEnter = (idx) => {
        if (videoRefs.current[idx]) {
            videoRefs.current[idx].play();
        }
    };
    const handleMouseLeave = (idx) => {
        if (videoRefs.current[idx]) {
            videoRefs.current[idx].pause();
        }
    };

    const displayReels = reels && reels.length > 0 ? reels : DEMO_REELS;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <div className="p-5">
            <Box className="flex justify-between items-center mb-5">
                <Typography variant="h5">Reels</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/upload')}
                >
                    Upload Reel
                </Button>
            </Box>

            {displayReels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayReels.map((reel, idx) => (
                        <Card key={reel.id}>
                            <CardMedia
                                component="video"
                                height="400"
                                src={reel.video}
                                controls
                                ref={el => videoRefs.current[idx] = el}
                                onMouseEnter={() => handleMouseEnter(idx)}
                                onMouseLeave={() => handleMouseLeave(idx)}
                                style={{ background: '#000' }}
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
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <Typography variant="h6" color="textSecondary">
                        No reels available. Create one to get started!
                    </Typography>
                </Box>
            )}
        </div>
    );
};

export default Reels; 