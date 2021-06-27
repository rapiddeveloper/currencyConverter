import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useRef } from 'react';
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
        marginTop: '96px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        formControl: {
          marginRight: '24px',
        },
     },

     convertBtn: {
      background: 'limegreen',
      borderRadius: '4px',
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
  const [targetCurrencies, setTargetCurrencies] = useState(["CAD","EUR", "JPY", "GBP", "KRW", "INR", "AUD", "HKD", "TWD", "BRL"])
  const [isLoading, setIsLoading] = useState(false)
  let selectedCurrencyType = useRef("base")

  async function loadData() {
   
    let symbolsVal = await manager.symbols()
    await handleConversion()
    setSymbols(symbolsVal)
   }

  const handleClickOpen = (currencyType: string, selectedCurrency: string) => {
    selectedCurrencyType.current = currencyType
    setSelectedTarget(selectedCurrency)
    setOpen(true);
  };

  const handleClose = async (value: string) => {


    if (value === "") { 
      setOpen(false)
      return
    }

    if (selectedCurrencyType.current === "base") {
      let oldVal = selectedValue

      setSelectedValue(value);

      const idx = targetCurrencies.findIndex((currency) => currency === value)
      if (idx > -1) {
        let temp = targetCurrencies.slice()
        temp[idx] = oldVal
        setTargetCurrencies(temp)
      }
    } 
    
    if (selectedCurrencyType.current === "target") {
       //debugger
      const idx = targetCurrencies.findIndex((currency) => currency === selectedTarget)
      // check if it matches base currecy
      if (value === selectedValue) {
         if (idx > -1) {
          let temp = targetCurrencies.slice()
          temp[idx] = selectedValue
          setTargetCurrencies(temp)
          setSelectedValue(selectedTarget)
        }
      }  
      
      // check whether new selected target is already in the exchange rslt list
      const newSelectedIdx = targetCurrencies.findIndex((currency) => currency === value)
      if (newSelectedIdx > -1) {
        let temp = targetCurrencies.slice()
        temp[idx] = value
        temp[newSelectedIdx] = selectedTarget
        setTargetCurrencies(temp)
      } else if (idx > -1) {
        let temp = targetCurrencies.slice()
        temp[idx] = value
        setTargetCurrencies(temp)
      }
      
    }
    setOpen(false);
    
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setAmount(event.target.value)
  }

  const handleConversion = async ()=>{
    setIsLoading(true)
    const value = Number(amount)
    //debugger
    if (!isNaN(value) && value > -1) {
       let rslt = await manager.convert(value, selectedValue, targetCurrencies)
        
       setRslt(rslt)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
     loadData()
     
  }, [])

  useEffect(()=>{
    handleConversion()
 }, [targetCurrencies, selectedValue, selectedTarget])
 
  return (
    <div className="App">
          <AppBar>
        <Toolbar>
          <Typography variant="subtitle1" classes={{subtitle1: classes.subtitle1}}>
            CurrencyBase
          </Typography>
          <Button onClick={()=>{handleClickOpen("base", "")}} variant="outlined" className={`${classes.surfaceColor} ${classes.outlined}`}>
            {selectedValue}
            <KeyboardArrowDownIcon/>
          </Button>
        </Toolbar>
      </AppBar>
      
      <div  className="main">
        <div className={classes.ctrlsContainer}>
          <TextField value={amount} onChange={handleChange} className={classes.textField} id="outlined-basic" label="Amount" variant="outlined" />
          <Button variant="contained" className={classes.convertBtn} onClick={handleConversion}>Convert</Button>
          {/* <div>Add Target Currency Button</div> */}
        </div>
        <div style={{textAlign: 'center'}} >
          {/* <CircularProgress style={{display: 'block'}} />   */}
          {
            manager.isLoading ?
              <CircularProgress size="1em"/>
              :
              <ExchangeRateList
                exchangeRslt={rslt}
                selectedTarget={selectedTarget}
                onOpen={handleClickOpen}
              />

          }
        </div>
        <CurrencyListDialog
          symbols={symbols}
          selectedValue={selectedValue}
          selectedTargetValue={selectedTarget}
          open={open} onClose={handleClose}
          selectedCurrencyType={selectedCurrencyType.current}
        />
      </div>
    </div>
      
  );
}

export default App;
