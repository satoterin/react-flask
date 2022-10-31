import { Outlet } from "react-router-dom";
import {
  Container,
  Grid,
  CssBaseline,
  Card,
  Box,
  useTheme
} from '@mui/material'

export default function Auth () {
  const theme = useTheme()
  return  (
    <Box minWidth="100vw" minHeight="100vh" sx={{backgroundColor: theme.palette.action.disabledBackground}}>
      <Container sx={{paddingTop: 20}}>
        <CssBaseline />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={7} lg={5}>
            <Card>
              <Box sx={{padding: 5}}>
                <Outlet />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}