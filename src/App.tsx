import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React from 'react';
//import logo from './logo.svg';
import './App.css';

const useStyles = makeStyles((theme: Theme)=>(
  createStyles({
     subtitle1: {
       marginRight: 'auto',
       fontWeight: 600,
       fontSize: 20
     }, 

     surfaceColor: {
       color: 'white'
     },

     outlined: {
       border: '1px solid white'
     }
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
      <div>
        <div>Textfield</div>
        <div>Convert Button</div>
        <div>Add Target Currency Button</div>
      </div>
      <div className={"targetCurrenciesContainer"}>
        <div>ListItem</div>
      </div>
    </div>
  );
}

export default App;
