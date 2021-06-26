/*
* A Component that shows a dialog list of currencies
*/

import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import CurrencyList from "../CurrencyList/CurrencyList";
import { Symbol } from '../../services/ExchangeHostAPIManager';


export interface CurrencyListDialogProps {
    symbols: Array<Symbol>
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

  const useStyles = makeStyles((theme: Theme)=>(
    createStyles({
       targetCurrenciesContainer: {
         display: 'grid'
       },
       paperScrollPaper: {
           width: '85vw',
           height: '80vh',
       }
    })
  ))

 

const CurrencyListDialog = (props: CurrencyListDialogProps)=>{

    const classes = useStyles()
     

    const handleClose = () => {
      props.onClose(props.selectedValue);
    };
  
    // const handleListItemClick = (value: string) => {
    //   props.onClose(value);
    // };

    return (
        <Dialog   classes={{paperScrollPaper: classes.paperScrollPaper}} onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <DialogTitle id="simple-dialog-title">Choose Base Currency</DialogTitle>
        <CurrencyList symbols={props.symbols} selectedValue={props.selectedValue} onClose={props.onClose} />
      </Dialog>
    )
}

export default CurrencyListDialog