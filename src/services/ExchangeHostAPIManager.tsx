/**
 * A class that manages data from the exchange rate API Service
 */

import axios from "axios"

export interface Symbol {
    description: string 
    code: string
}

export interface ExchangeRslt {
    symbol: Symbol 
    amount?: number
}

class ExchangeHostAPIManager {

    isLoading: boolean = false 
    data: any = null 
    symbolsData: Array<Symbol> = []
    static manager = new ExchangeHostAPIManager()
   
    /**
     * loads lates exchange rates from base to symbols
     * @param baseCurrency currency to convert from
     * @param symbols list of currencies to convert to
     */
    async loadRateData(baseCurrency:string, symbols: string) {
        this.isLoading = true

        try {
            const rslt = await axios(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${symbols}&places=4`)  
            
            if (rslt.data.success) {
                this.data = rslt.data.rates
             } else {
                this.data = null
             }
        } catch (error) {
            this.data = null
        }
       
    }

     /**
     * loads symbols
     *  
     */
      async loadCurrenciesData() {
        this.isLoading = true

        try {
            const rslt = await axios(`https://api.exchangerate.host/symbols`)  
            
            if (rslt.data.success) {
               // this.symbolsData = rslt.data.symbols
                for (let field in rslt.data.symbols) {
                    this.symbolsData.push(rslt.data.symbols[field])
                }
                console.dir(this.symbolsData)
              
             } else {
                this.symbolsData = []
             }
        } catch (error) {
            this.symbolsData = []
        }
       
    }
    
    /**
     * converts an amount of money from a base currency to a list of target currencies
     * @param amount amount of money
     * @param baseCurrency 
     * @param targetCurrencies same as symbols but an array
     * @returns converted amount for each target currency
     */
    async convert(amount: number, baseCurrency: string, targetCurrencies: Array<string>): Promise<Array<ExchangeRslt>> {
        let rslt = Array<ExchangeRslt>()
        let symbols = targetCurrencies.join()
        await this.loadRateData(baseCurrency, symbols)
       
        if (this.data === null) return rslt

        if (this.symbolsData.length === 0) return rslt

        // get symbol of target
        //debugger
        for (let currency of targetCurrencies) {
            const idx = this.symbolsData.findIndex((symbol)=> symbol.code === currency)
            // create default exchangRslt instance
            if (idx > -1) {
                 rslt.push({symbol: this.symbolsData[idx], amount: this.data[currency] * amount})
            }
            //  else {
            //     rslt.push({symbol: this.symbolsData[idx], amount: undefined})
            // }
         }
        
        return rslt
    }

    async symbols(): Promise<Array<Symbol>> {
         
        await this.loadCurrenciesData()
       
        if (this.symbolsData.length === 0) return []
        
        return this.symbolsData.slice()
       
    }
}

export const manager = ExchangeHostAPIManager.manager