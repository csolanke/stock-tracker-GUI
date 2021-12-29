import React, { Component } from 'react';
import StockService from '../services/StockService';

class ListStocksComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stocks: []
        }

        this.addStock = this.addStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
        this.viewStock = this.viewStock.bind(this);
    };


    componentDidMount() {
        StockService.getStocks().then((res) => {
            this.setState({ stocks: res.data });
        })
    }

    addStock()
    {
      this.props.history.push('/add-stock'); 
    }

    editStock(id)
    {
        //this.props.history.push(`/edit-employee/${id}`);
    }

    deleteStock(id)
    {
        // code to call method from service class to invoke rest api delete method
       // EmployeeService.deleteEmployeeById(id).then(res=>{
       // this.setState({employees : this.state.employees.filter(employee=> employee.id!==id)});
       // })
        
    }

    viewStock(id)
    {
        this.props.history.push(`/view-stock/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Currrent Holdings</h2>
                <div className="button" align="right">
                    <button className="btn btn-primary" onClick={this.addStock}>Add Stock</button>
                </div>

                <div className="row">

                    <table className="table table-striped table-bordered">
                        <thead class="thead-dark"> 
                            <tr>
                                <th>Stock Name</th>
                                <th>Date Purchased</th>
                                <th>Quantity</th>
                                <th>Amount Invested</th>
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
                                        <td>{stock.amountInvested}</td>
                                        {/* <td>{stock.currentValueOfInvestment}</td> */}
                                        
                                        <td>
                                            <button onClick ={()=> this.editStock(stock.id)} className="btn btn-info">Update</button>
                                            <button style = {{marginLeft:'10px'}} onClick ={()=> this.deleteStock(stock.id)} className="btn btn-danger">Delete</button>
                                            <button style = {{marginLeft:'10px'}} onClick ={()=> this.viewStock(stock.id)} className="btn btn-danger">View</button>
                                        </td>
                                    </tr>
                            )}
                        </tbody>

                    </table>

                </div>

            </div>
        );
    }
}

export default ListStocksComponent;