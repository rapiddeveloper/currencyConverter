/*
* A Component that shows a list of currencyes
*/

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";



const CurrencyList = ()=>{

    const currencies = [
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar",
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar",
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar",
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar",
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar",
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar",
        "NGN Nigerian Naira", 
        "GBP Great British Pounds",
        "USD United State Dollar"
    ]

    const handleListItemClick = ()=>{}

    return (
        <List>
        {currencies.map((currency) => (
          <ListItem button onClick={() => handleListItemClick()} key={currency}>
            <ListItemText primary={currency} />
          </ListItem>
        ))}
        </List>
    )

}

export default CurrencyList