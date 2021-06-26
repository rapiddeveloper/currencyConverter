import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ExchangeRateList from './Components/ExchangeRateList/ExchangeRateList';

const useStyles = makeStyles((theme: Theme)=>(
  createStyles({
     subtitle1: {
       marginRight: 'auto',
       fontWeight: 600,
       fontSize: 20
     }, 

     root: {
       flexGrow: 1
     },

     surfaceColor: {
       color: 'white'
     },

     outlined: {
       border: '1px solid white'
     },

     ctrlsContainer: {
        marginTop: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        formControl: {
          marginRight: '24px',
        },
     },

     textField: {
       marginRight: 32
     }, 



  })
))

function App() {

  const classes = useStyles()

 
  return (
    <div className="App">
          <AppBar>
        <Toolbar>
          <Typography variant="subtitle1" classes={{subtitle1: classes.subtitle1}}>
            CurrencyBase
          </Typography>
          <Button variant="outlined" className={`${classes.surfaceColor} ${classes.outlined}`}>
            USD
            <KeyboardArrowDownIcon/>
          </Button>
        </Toolbar>
      </AppBar>
      
    
      <div className={classes.ctrlsContainer}>
         <TextField className={classes.textField} id="outlined-basic"  label="Amount" variant="outlined" />
         <Button variant="contained">Convert</Button>
        {/* <div>Add Target Currency Button</div> */}
      </div>
       <ExchangeRateList/>
    </div>
  );
}

export default App;
