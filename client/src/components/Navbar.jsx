import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/Auth/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const navigationItems = [
        {
            icon: <HomeIcon />,
            text: 'Home',
            path: '/'
        },
        {
            icon: <PersonIcon />,
            text: 'Profile',
            path: '/profile'
        },
        {
            icon: <VideocamIcon />,
            text: 'Reels',
            path: '/reels'
        }
    ];

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Social Media
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <List sx={{ display: 'flex' }}>
                        {navigationItems.map((item) => (
                            <ListItem
                                key={item.text}
                                component={Link}
                                to={item.path}
                                sx={{ color: 'white' }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    {user ? (
                        <Button
                            color="inherit"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 