import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen () {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" position="fixed" left="0" top="0" bgcolor="white">
      <CircularProgress />
    </Box>
  )
}