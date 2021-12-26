import axios from 'axios'


const STOCK_API_BASE_URL ="http://localhost:8080/api/v1/stocks";
class StockService{

getStocks()
{
    return axios.get(STOCK_API_BASE_URL);
}

createStock(stock) 
{
    return axios.post(STOCK_API_BASE_URL,stock);
    
}

getStockById(stockId)
{
    return axios.get(STOCK_API_BASE_URL + '/'+ stockId);
}

updateStocks(stock, stockId)
{
    return axios.put(STOCK_API_BASE_URL +'/'+ stockId,stock);
}

deleteStockById(stockId)
{
    return axios.delete(STOCK_API_BASE_URL +'/'+stockId);
}

}
export default new StockService();