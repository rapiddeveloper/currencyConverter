import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import CurrencyListDialog from './Components/CurrencyListDialog/CurrencyListDialog';
import ExchangeRateList from './Components/ExchangeRateList/ExchangeRateList';
import { manager, Symbol } from './services/ExchangeHostAPIManager';

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
  const [rslt, setRslt] = useState(Array<number>())
  const [symbols, setSymbols] = useState(Array<Symbol>())
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("USD")
  //const [currencies, setCurrencies] 
  //console.dir(rslt)

  async function loadData() {
    let c = ["CAD","EUR", "JPY", "GBP", "KRW", "INR", "AUD"]
    let r = await manager.convert(10, "USD", c)
    let data = await manager.symbols()
    
    setSymbols(data)
    setRslt(r)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(()=>{
     loadData()
     
  }, [])
 
  return (
    <div className="App">
          <AppBar>
        <Toolbar>
          <Typography variant="subtitle1" classes={{subtitle1: classes.subtitle1}}>
            CurrencyBase
          </Typography>
          <Button onClick={handleClickOpen} variant="outlined" className={`${classes.surfaceColor} ${classes.outlined}`}>
            {selectedValue}
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
       <CurrencyListDialog symbols={symbols} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export default App;
