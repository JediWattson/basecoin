export type CurrencyDataItem = {
    id: string,
    name: string
} 

export type RateDataItem = {
    price: string,
}

export type ExchangeItem = (RateDataItem & CurrencyDataItem)    
