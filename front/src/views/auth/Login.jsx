import {
  Fragment,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MaterialLink,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  useForm,
  Controller
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { loginAsync } from '../../store/auth.slice'
import history from '../../history'
import { getToken } from '../../utils';
import { getAuthedUserAsync } from '../../store/auth.slice';

export default function SignIn() {
  const [apiError, setApiError] = useState(null)
  const dispatch = useDispatch()
  const authedUser = useSelector(state=>state.auth)
  const token = getToken()
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }).required();

  const { control, handleSubmit, formState:{errors, isSubmitting}} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setApiError(null)
    const res = await dispatch(loginAsync(data))
    if(res.error) {
      setApiError(res.payload)
    } 
    return res
  };
  useEffect(()=>{
    if(token) {
      if (!authedUser) {
        dispatch(getAuthedUserAsync())
      }
    }
  }, [token])
  
  if (authedUser) {
    const {from} = history.location.state || {from: {pathname: '/dashboard'}}
    return <Navigate to={from} />
  }
  
  return (
    <Fragment>
      <Typography component="h1" textAlign="center" variant="h4">
        Sign in
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginTop={4}>
          { !!apiError && (
            <Box marginBottom={4}>
              <Alert severity="error">{apiError}</Alert>
            </Box>
          )}
          <Controller
            control={control}
            name="email"
            render={({field}) =>
              <TextField
                fullWidth
                margin="dense"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ' '}
                {...field}
              />
            }
          />
          <Controller
            control={control}
            name="password"
            render={({field}) =>
              <TextField
                margin="dense"
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ' '}
                {...field}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant="contained"
              disabled={isSubmitting}
              color="primary"
              fullWidth
              size="large"
              sx={{height: 44, fontSize: 16}}
              type="submit"
            >
              {!isSubmitting ? 'Sign In' : ' '}
            </Button>
            {isSubmitting && (
              <CircularProgress
                size={24}
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <Grid container marginTop={3}>
            <Grid item xs>
              <MaterialLink component={Link} to="/auth/register" variant="body2">
                Forgot password?
              </MaterialLink>
            </Grid>
            <Grid item>
              <MaterialLink component={Link} to="/auth/register" variant="body2">
                Don't have an account? Sign Up
              </MaterialLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Fragment>
  );
}