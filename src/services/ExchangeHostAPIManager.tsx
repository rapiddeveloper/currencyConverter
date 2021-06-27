/**
 * A class that manages data from the exchange rate API Service
 */

import axios from "axios"

export interface Symbol {
    description: string 
    code: string
}

class ExchangeHostAPIManager {

    isLoading: boolean = false 
    data: any = null 
    symbolsData: any = null
    static manager = new ExchangeHostAPIManager()
   
    /**
     * loads lates exchange rates from base to symbols
     * @param baseCurrency currency to convert from
     * @param symbols list of currencies to convert to
     */
    async loadRateData(baseCurrency:string, symbols: string) {
        this.isLoading = true

        try {
            const rslt = await axios(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${symbols}&places=2`)  
            
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
                this.symbolsData = rslt.data.symbols
                console.dir(this.symbolsData)
              
             } else {
                this.symbolsData = null
             }
        } catch (error) {
            this.symbolsData = null
        }
       
    }
    
    /**
     * converts an amount of money from a base currency to a list of target currencies
     * @param amount amount of money
     * @param baseCurrency 
     * @param targetCurrencies same as symbols but an array
     * @returns converted amount for each target currency
     */
    async convert(amount: number, baseCurrency: string, targetCurrencies: Array<string>): Promise<Array<number>> {
        let rslt = Array<number>()
        let symbols = targetCurrencies.join()
        await this.loadRateData(baseCurrency, symbols)
       
        if (this.data === null) return rslt
        
        for (let currency of targetCurrencies) {
            rslt.push(this.data[currency] * amount)  
        }
        
        return rslt
    }

    async symbols(): Promise<Array<Symbol>> {
        let rslt = Array<Symbol>()
        await this.loadCurrenciesData()

        if (this.symbolsData === null) return rslt

        for (let field in this.symbolsData) {
            rslt.push(this.symbolsData[field])
        }

        return rslt
    }
}

export const manager = ExchangeHostAPIManager.manager