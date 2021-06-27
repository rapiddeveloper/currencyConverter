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
import { ExchangeRslt } from "../../services/ExchangeHostAPIManager";


const useStyles = makeStyles((theme: Theme)=>(
    createStyles({
       targetCurrenciesContainer: {
         display: 'grid'
       }
  
    })
  ))

  interface ExchangeRateListProps {
      exchangeRslt: Array<ExchangeRslt>
      selectedTarget: string
  }

const ExchangeRateList = ({exchangeRslt, selectedTarget}: ExchangeRateListProps)=>{
    
    const exchangeRatelist =  exchangeRslt.map((item, index) =>
        <>
            <ListItem button>
                <ListItemText primary={item.symbol.code} secondary={item.symbol.description} />
                <Typography variant="h6">
                    {item?.amount}
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