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
      onOpen: (currencyType: string, selectedCurrency: string)=>void
  }

const ExchangeRateList = ({exchangeRslt, selectedTarget, onOpen}: ExchangeRateListProps)=>{
    
    const handleListItemClick = (value: string)=>{
        onOpen("target", value)
    }

    const exchangeRatelist =  exchangeRslt.map((item, index) =>
        <div key={item.symbol.code}>
            <ListItem key={item.symbol.code} button onClick={()=>handleListItemClick(item.symbol.code)}>
                <ListItemText primary={item.symbol.code} secondary={item.symbol.description} />
                <Typography variant="h6">
                    {item.amount?.toFixed(2)}
                </Typography>
            </ListItem>
            <Divider variant="inset" />
        </div>
    )


    return (
        <List>
            {exchangeRatelist}
        </List>
    )

}

export default ExchangeRateList