/*
* A Component that shows a dialog list of currencies
*/

import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import CurrencyList from "../CurrencyList/CurrencyList";

export interface CurrencyListProps {
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

const CurrencyListDialog = ()=>{

    const classes = useStyles()
    const handleClose = ()=> {}
    const handleListItemClick = ()=>{}

    return (
        <Dialog classes={{paperScrollPaper: classes.paperScrollPaper}} onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
        <DialogTitle id="simple-dialog-title">Choose Base Currency</DialogTitle>
        <CurrencyList/>
      </Dialog>
    )
}

export default CurrencyListDialog