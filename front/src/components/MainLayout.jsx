import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  Menu,
  IconButton,
  MenuItem,
  Tooltip,
  Avatar,
  MenuList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  Adb as AdbIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  PersonOutline as PersonOutlineIcon,
  DarkMode,
  LightMode
} from '@mui/icons-material'

import { logoutAsync } from '../store/auth.slice';
import { toggle as toggleUI } from '../store/theme.slice';

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard'
  },
  {
    label: 'Preference',
    to: '/preference'
  }
]

export default function MainLayout({children}) {
  const dispatch = useDispatch()
  const authedUser = useSelector(state=>state.auth)
  const theme = useSelector(state=>state.theme)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function onLogout() {
    dispatch(logoutAsync())
  }
  function toggleUiMode () {
    dispatch(toggleUI())
    setAnchorElUser(null)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Toggle
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              open={!!anchorElNav}
              anchorEl={anchorElNav}
              onClose={handleCloseNavMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">BTC price</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Toggle
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {MENU_ITEMS.map(it=>(
              <Button
                key={it.to}
                component={Link}
                to={it.to}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {it.label}
              </Button>
            ))}
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton  sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuList>
                <MenuItem divider>
                  <ListItemText sx={{textAlign: 'center', textTransform: 'capitalize'}}>Hi, {authedUser.name}</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={toggleUiMode}>
                  <ListItemIcon>
                    { theme === 'light' ? <DarkMode /> : <LightMode />}
                  </ListItemIcon>
                  <ListItemText>{ theme === 'light' ? 'Dark' : 'Light'} Mode</ListItemText>
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>

              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
