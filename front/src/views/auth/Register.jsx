import {
  Fragment,
  useState
} from 'react';
import {
  useDispatch
} from 'react-redux'
import {
  Link,
} from 'react-router-dom'
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

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { registerAsync } from '../../store/auth.slice'

import history from '../../history';

export default function SignUp() {
  const [agree, setAgree] = useState(false)
  const [apiError, setApiError] = useState(null)
  const dispatch = useDispatch()

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  const { control, handleSubmit, formState: {errors, isSubmitting }} = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data) => {
    const res = await dispatch(registerAsync(data))
    if(res.error) {
      setApiError(res.payload)
    } else {
      history.navigate('/auth/login')
    }
    return res
  };

  return (
    <Fragment>
      <Typography component="h1" variant="h4" textAlign="center">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginTop={4}>
          { !!apiError && (
            <Box marginBottom={4}>
              <Alert severity="error">{apiError}</Alert>
            </Box>
          )}
          <Controller
            name="name"
            control={control}
            render={({field})=> (
              <TextField
                fullWidth
                margin="dense"
                label="Full Name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={!!errors.name ? errors.name.message : ' '}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({field})=>(
              <TextField
                fullWidth
                margin="dense"
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                helperText={!!errors.email ? errors.email.message : ' '}
                {...field}
              />
            )}    
          />
          <Controller
            name="password"
            control={control}
            render={({field})=>(
              <TextField
                fullWidth
                margin="dense"
                label="Password"
                type="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={!!errors.password ? errors.password.message : ' '}
                {...field}
              />
            )}              
          />
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                color="primary"
                checked={agree}
                onChange={e=>{setAgree(e.target.checked)}}
              />
            }
            label="I agree with the terms of service."
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
              {!isSubmitting ? 'Sign Up' : ' '}
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
          <Grid container justifyContent="flex-end" marginTop={3}>
            <Grid item>
              <MaterialLink component={Link} to="/auth/login" variant="body2">
                Already have an account? Sign in
              </MaterialLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Fragment>
  );
}