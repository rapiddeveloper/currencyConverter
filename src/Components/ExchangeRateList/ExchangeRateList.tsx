/*
* A Component that shows a list exchange rates for an amount 
*/

import React from "react";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import List from "@material-ui/core/List";


const useStyles = makeStyles((theme: Theme)=>(
    createStyles({
       targetCurrenciesContainer: {
         display: 'grid'
       }
  
    })
  ))

const ExchangeRateList = ()=>{

    const exchangeRatelist = [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
        <>
            <ListItem button>
                <ListItemText primary="NAIRA" secondary="NGN" />
                <Typography variant="h6">
                    $200.00
                </Typography>
            </ListItem>
            <Divider variant="inset" />
        </>
    )


    return (
        <List>
            {exchangeRatelist}
        </List>
    )

}

export default ExchangeRateList