import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../state/Post/post.action';
import { createReel } from '../state/Reels/reels.action';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';

const Upload = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [postData, setPostData] = useState({ title: '', media: '', caption: '' });
  const [postUploadType, setPostUploadType] = useState('file');
  const [postFile, setPostFile] = useState(null);
  const [reelData, setReelData] = useState({ title: '', video: '', caption: '' });
  const [reelUploadType, setReelUploadType] = useState('file');
  const [reelFile, setReelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError(null);
    setSuccess(null);
  };

  const handlePostChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleReelChange = (e) => {
    setReelData({ ...reelData, [e.target.name]: e.target.value });
  };

  const handlePostUploadTypeChange = (e) => {
    setPostUploadType(e.target.value);
    setPostFile(null);
    setPostData({ ...postData, media: '' });
  };

  const handlePostFileChange = (e) => {
    setPostFile(e.target.files[0]);
  };

  const handleReelUploadTypeChange = (e) => {
    setReelUploadType(e.target.value);
    setReelFile(null);
    setReelData({ ...reelData, video: '' });
  };

  const handleReelFileChange = (e) => {
    setReelFile(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let mediaUrl = postData.media;
      if (postUploadType === 'file' && postFile) {
        // Determine file type for Cloudinary (image or video)
        const fileType = postFile.type.startsWith('video') ? 'video' : 'image';
        mediaUrl = await uploadToCloudinary(postFile, fileType);
        if (!mediaUrl) throw new Error('Cloudinary upload failed');
      }
      await dispatch(createPost({ data: { ...postData, media: mediaUrl } }));
      setSuccess('Post uploaded successfully!');
      setPostData({ title: '', media: '', caption: '' });
      setPostFile(null);
    } catch (err) {
      setError('Failed to upload post.');
    }
    setLoading(false);
  };

  const handleReelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let videoUrl = reelData.video;
      if (reelUploadType === 'file' && reelFile) {
        videoUrl = await uploadToCloudinary(reelFile, 'video');
        if (!videoUrl) throw new Error('Cloudinary upload failed');
      }
      await dispatch(createReel({ data: { ...reelData, video: videoUrl } }));
      setSuccess('Reel uploaded successfully!');
      setReelData({ title: '', video: '', caption: '' });
      setReelFile(null);
    } catch (err) {
      setError('Failed to upload reel.');
    }
    setLoading(false);
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="white" style={{ color: 'black' }}>
      <Tabs value={tab} onChange={handleTabChange} centered textColor="primary" indicatorColor="primary" sx={{ color: 'black' }}>
        <Tab label="Post" sx={{ color: 'black', fontWeight: tab === 0 ? 'bold' : 'normal' }} />
        <Tab label="Reel" sx={{ color: 'black', fontWeight: tab === 1 ? 'bold' : 'normal' }} />
      </Tabs>
      {error && <Alert severity="error" sx={{ mt: 2, color: 'black' }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2, color: 'black' }}>{success}</Alert>}
      {tab === 0 && (
        <form onSubmit={handlePostSubmit} style={{ marginTop: 24 }}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={postData.title}
            onChange={handlePostChange}
            InputLabelProps={{ style: { color: 'black' } }}
            sx={{
              input: { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
              }
            }}
          />
          <RadioGroup
            row
            value={postUploadType}
            onChange={handlePostUploadTypeChange}
            sx={{ mt: 2, mb: 2, color: 'black' }}
          >
            <FormControlLabel value="file" control={<Radio sx={{ color: 'black' }} />} label={<span style={{ color: 'black' }}>Upload File</span>} />
            <FormControlLabel value="url" control={<Radio sx={{ color: 'black' }} />} label={<span style={{ color: 'black' }}>Paste Image/Video URL</span>} />
          </RadioGroup>
          {postUploadType === 'file' ? (
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handlePostFileChange}
              style={{ marginBottom: 16, color: 'black' }}
            />
          ) : (
            <TextField
              label="Image/Video URL"
              name="media"
              fullWidth
              margin="normal"
              value={postData.media}
              onChange={handlePostChange}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                input: { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
            />
          )}
          <TextField
            label="Caption"
            name="caption"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={postData.caption}
            onChange={handlePostChange}
            InputLabelProps={{ style: { color: 'black' } }}
            sx={{
              input: { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
              }
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} /> : 'Upload Post'}
          </Button>
        </form>
      )}
      {tab === 1 && (
        <form onSubmit={handleReelSubmit} style={{ marginTop: 24 }}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={reelData.title}
            onChange={handleReelChange}
            InputLabelProps={{ style: { color: 'black' } }}
            sx={{
              input: { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
              }
            }}
          />
          <RadioGroup
            row
            value={reelUploadType}
            onChange={handleReelUploadTypeChange}
            sx={{ mt: 2, mb: 2, color: 'black' }}
          >
            <FormControlLabel value="file" control={<Radio sx={{ color: 'black' }} />} label={<span style={{ color: 'black' }}>Upload File</span>} />
            <FormControlLabel value="url" control={<Radio sx={{ color: 'black' }} />} label={<span style={{ color: 'black' }}>Paste Video URL</span>} />
          </RadioGroup>
          {reelUploadType === 'file' ? (
            <input
              type="file"
              accept="video/*"
              onChange={handleReelFileChange}
              style={{ marginBottom: 16, color: 'black' }}
            />
          ) : (
            <TextField
              label="Video URL"
              name="video"
              fullWidth
              margin="normal"
              value={reelData.video}
              onChange={handleReelChange}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                input: { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
            />
          )}
          <TextField
            label="Caption"
            name="caption"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={reelData.caption}
            onChange={handleReelChange}
            InputLabelProps={{ style: { color: 'black' } }}
            sx={{
              input: { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
              }
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} /> : 'Upload Reel'}
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Upload; 