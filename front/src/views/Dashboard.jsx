import {
  useEffect,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CardHeader,
  CardContent,
  Button,
} from '@mui/material';
import ApexChart from 'react-apexcharts'
import MainLayout from '../components/MainLayout';

import { fetchRatesAsync } from '../store/rates.slice'

export default function ClippedDrawer() {
  const dispatch = useDispatch()
  const rates = useSelector(state=>state.rates)
  
  useEffect(()=>{
    const timer = setInterval(()=>{
      dispatch(fetchRatesAsync())
    }, 1000)
    return () =>{
      clearInterval(timer)
    }
  }, [])
  
  return (
    <MainLayout>
      <Box marginBottom={3} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained">Guess</Button>
      </Box>
      <Grid container spacing={4}>
        <Grid item lg={8}>
          <Card>
            <CardContent>
              <ApexChart
                series= {[
                  {
                    name: 'BTC Rates',
                    data: rates.rates
                  }
                ]}
                options={{
                  chart: {
                    id: 'realtime',
                    animations: {
                      enabled: true,
                      easing: 'linear',
                      dynamicAnimation: {
                        speed: 1000
                      }
                    },
                  },
                  stroke: {
                    curve: 'smooth'
                  },
                  title: {
                    text: 'BTC Rates',
                    align: 'left'
                  },
                  xaxis: {
                    type: 'datetime',
                    categories: rates.times,
                    range: 100000,
                    
                  },
                  yaxis: {
                    min: Math.min(...(rates.rates)) - 150,
                    max:  Math.max(...(rates.rates)) + 150
                  },
                }}
                type="line"
                height={550}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card>
            <CardHeader title="Recent changes"></CardHeader>
            <CardContent>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rate</TableCell>
                      <TableCell align="right">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rates.changes.slice(0, 10).map((row) => (
                      <TableRow
                        key={row.time}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.rate}
                        </TableCell>
                        <TableCell align="right">{(new Date(row.time)).toTimeString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
