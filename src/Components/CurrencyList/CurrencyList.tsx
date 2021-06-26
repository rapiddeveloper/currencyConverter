/*
* A Component that shows a list of currencyes
*/

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Symbol } from '../../services/ExchangeHostAPIManager';


interface CurrencyListProps {
    symbols: Array<Symbol>
    selectedValue: string
    onClose: (value: string)=>void
}

const CurrencyList = (props: CurrencyListProps)=>{

    
    console.log(props.selectedValue)
    const currencies =  props.symbols

    const handleListItemClick = (value: string)=>{
       
        props.onClose(value)
    }

    return (
        <List>
        {currencies.map((currency) => (
          <ListItem autoFocus={props.selectedValue === currency.code} button onClick={() => handleListItemClick(currency.code)} key={currency.code}>
            <ListItemText primary={currency.code + " " + currency.description} />
          </ListItem>
        ))}
        </List>
    )

}

export default CurrencyList