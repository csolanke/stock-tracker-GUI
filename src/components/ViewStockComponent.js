import React, { Component } from 'react';
import StockService from '../services/StockService';

class ViewStockComponent extends Component {

  constructor(props)
  {
            super(props);

            this.state= {
                  id :  this.props.match.params.id,
                  stock :{}
            };
  }
        componentDidMount()
        {
            StockService.getStockById(this.state.id).then(res=>{
               
                this.setState({stock : res.data}) ;

            })
        }


    render() {
        return (
            <div>
                   <div className="card col-md-6 offset-md-3">
                          <h3 className="text-center">Stock Details</h3> 

                           <div className="card-body">

                                <div className="row">
                                    <div> <label style = {{marginRight:'5px'}}>Name: </label>{this.state.stock.name}</div>
                                </div>
                                 <div className="row">
                                    <div> <label style = {{marginRight:'5px'}}>Date Purchased: </label>{this.state.stock.purchaseDate}</div>
                                </div>
                                <div className="row">
                                    <div> <label style = {{marginRight:'5px'}}>Price Purchased: </label>{this.state.stock.pricePurchased}</div>
                                </div>
                                 <div className="row">
                                    <div> <label style = {{marginRight:'5px'}}>Quantity:</label>{this.state.stock.quantityPurchased}</div>
                                </div>
                                
                                <div className="row">
                                    <div> <label style = {{marginRight:'5px'}}>Amount Invested:</label>{this.state.stock.amountInvested}</div>
                                </div>
                                <div className="row">
                                    <div> <label style = {{marginRight:'5px'}}>Current Value Of Investment:</label>{this.state.stock.currentValueOfInvestment}</div>
                                </div>


                           </div>
                           
                   </div>
                
            </div>
        );
    }
}

export default ViewStockComponent;