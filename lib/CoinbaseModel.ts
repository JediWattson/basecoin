export type CurrencyDataItem = {
    id: string,
    name: string
} 

export type RateDataItem = {
    value: string,
}

export type ExchangeItem = (RateDataItem & CurrencyDataItem)    
