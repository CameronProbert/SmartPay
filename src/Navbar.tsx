import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Home, Menu } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from './App';
import { User } from './useAuth';

type NavbarProps = {
    user: User | null;
};
export const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const { push } = useHistory();
    return <AppBar position="static" >
        <Toolbar style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <section style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">
                    Smart Pay
                </Typography>
            </section>
            {user && <Typography variant="h6">
                {user.userName}
            </Typography>}
            <IconButton onClick={() => push(AppRoute.home)} edge="start" color="inherit" aria-label="Home">
                <Home />
            </IconButton>
        </Toolbar>
    </AppBar >;
};