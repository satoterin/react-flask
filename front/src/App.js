import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material'
import Dashboard from './views/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Auth from './views/auth';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Home from './views/Home'
import Preference from './views/Prefernece';

import history from './history'
import { useSelector } from 'react-redux';

const lightTheme = createTheme({})
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
})
 
function App() {
  const theme = useSelector(state=>state.theme)

  history.location = useLocation()
  history.navigate = useNavigate()
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Box minHeight="100vh">
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
          <Route path="/preference" element={<PrivateRoute><Preference /></PrivateRoute>}></Route>
          <Route index element={<Home />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
