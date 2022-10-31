import { Link } from 'react-router-dom'
import {
  Box,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

export default function ClippedDrawer() {
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{justifyContent: 'flex-end'}}>
          <Button component={Link} to="/auth/login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box>
          <Typography>Welcome to the program</Typography>
        </Box> 
      </Box>
    </Box>
  );
}
