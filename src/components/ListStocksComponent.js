import React, { Component } from 'react';
import StockService from '../services/StockService';

class ListStocksComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stocks: [],
            numberOfStocks:''
        }

        this.addStock = this.addStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
        this.viewStock = this.viewStock.bind(this);
    };


    componentDidMount() {
        StockService.getStocks().then((res) => {
            this.setState({ stocks: res.data });
            this.setState({numberOfStocks:res.data.length})
            console.log(this.state.stocks)
            console.log(this.state.numberOfStocks);
        })
    }

    addStock()
    {
      this.props.history.push('/add-stock'); 
    }

    editStock(id)
    {
        this.props.history.push(`/edit-stock/${id}`);
    }

    deleteStock(id)
    {

       StockService.deleteStockById(id).then(res=>{
           this.setState({stocks : this.state.stocks.filter(stock=> stock.id!==id)});
           this.setState({numberOfStocks: this.state.numberOfStocks -1})
       })
        
    }

    viewStock(id)
    {
        this.props.history.push(`/view-stock/${id}`);
    }

    render() {
        return (
            <div>
                <div></div>
                <h4 className="text-center">Holdings({this.state.numberOfStocks})</h4>
                

                <div className="row">

                    <table className="table table-striped table-bordered">
                        <thead> 
                            <tr className='table-dark'>
                                <th>Stock Name</th>
                                <th>Date Purchased</th>
                                <th>Quantity</th>
                                <th>Buy price</th>
                                <th>Amount Invested</th>
                                <th>Buy Strategy</th>
                                {/* <th>Current Value of Investment</th> */}

                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stocks.map(
                                stock =>
                                    <tr key={stock.id}>
                                        <td>{stock.name}</td>
                                        <td>{stock.purchaseDate}</td>
                                        <td>{stock.quantityPurchased}</td>
                                        <td>{stock.pricePurchased}</td>
                                        <td>{stock.amountInvested}</td>
                                        <td>{stock.purchaseStrategy}</td>
                                        {/* <td>{stock.currentValueOfInvestment}</td> */}
                                        
                                        <td>
                                            <button onClick ={()=> this.editStock(stock.id)} className="btn btn-success">Update</button>
                                            <button style = {{marginLeft:'10px'}} onClick ={()=> this.deleteStock(stock.id)} className="btn btn-danger">Delete</button>
                                            <button style = {{marginLeft:'10px'}} onClick ={()=> this.viewStock(stock.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                            )}
                        </tbody>

                    </table>

                    <div className="button" align="center">
                    <button className="btn btn-primary" onClick={this.addStock}>Add Stock to Holding</button>
                </div>

                </div>

            </div>
        );
    }
}

export default ListStocksComponent;