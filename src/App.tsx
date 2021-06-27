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
import { ExchangeRslt, manager, Symbol } from './services/ExchangeHostAPIManager';

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
  const [rslt, setRslt] = useState(Array<ExchangeRslt>())
  const [symbols, setSymbols] = useState(Array<Symbol>())
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("USD")
  const [selectedTarget, setSelectedTarget] = useState("CAD")
  const [amount, setAmount] =  useState("1")
  const [targetCurrencies, setTargetCurrencies] = useState(["CAD","EUR", "JPY", "GBP", "KRW", "INR", "AUD"])
  
  async function loadData() {
   
    //let rsltVal = await manager.convert(Number(amount), selectedValue, targetCurrencies)
    let symbolsVal = await manager.symbols()
    await handleConversion()
    setSymbols(symbolsVal)
    //setRslt(rsltVal)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (value: string) => {
    let oldVal = selectedValue
    setOpen(false);
    setSelectedValue(value);
    
   
    const idx = targetCurrencies.findIndex((currency)=> currency === value) 
    if (idx > -1) {
      let temp = targetCurrencies.slice()
      temp[idx] = oldVal
      setTargetCurrencies(temp)
     }  
    
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setAmount(event.target.value)
  }

  const handleConversion = async ()=>{
    const value = Number(amount)
    //debugger
    if (!isNaN(value) && value > -1) {
       let rslt = await manager.convert(value, selectedValue, targetCurrencies)
       console.dir(rslt)
       setRslt(rslt)
    }
  }

  useEffect(()=>{
     loadData()
     
  }, [])

  useEffect(()=>{
    handleConversion()
 }, [targetCurrencies, selectedValue])
 
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
         <TextField value={amount} onChange={handleChange} className={classes.textField} id="outlined-basic"  label="Amount" variant="outlined" />
         <Button variant="contained" onClick={handleConversion}>Convert</Button>
        {/* <div>Add Target Currency Button</div> */}
      </div>
       <ExchangeRateList exchangeRslt={rslt} selectedTarget={selectedTarget} />
       <CurrencyListDialog symbols={symbols} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export default App;
