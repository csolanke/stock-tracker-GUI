import React, { Component } from 'react';
import StockService from '../services/StockService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class UpdateStockComponent extends Component {

    
   constructor(props)
   {
       super(props);
       this.state ={
           id: this.props.match.params.id,
           name : '',
           pricePurchased : '',
           purchaseDate : '',
           quantityPurchased:'',
           amountInvested:'',
           purchaseStrategy:''

       }

       this.changeNameHandler = this.changeNameHandler.bind(this);
       this.changePriceHandler = this.changePriceHandler.bind(this);
       this.changeDatehandler = this.changeDatehandler.bind(this);
       this.changeQuantityHandler=this.changeQuantityHandler.bind(this);
       this.changeAmountInvestedHandler=this.changeAmountInvestedHandler.bind(this)
       this.updateStock = this.updateStock.bind(this);
       this.cancelRedirect = this.cancelRedirect.bind(this);
       this.strategyHandler=this.strategyHandler.bind(this);
   }

   
   componentDidMount()
   {
       StockService.getStockById(this.state.id).then(res=>{

        let stock = res.data;

        console.log(stock);

         this.setState({
             name: stock.name,
             pricePurchased : stock.pricePurchased,
             purchaseDate : new Date(stock.purchaseDate),
             quantityPurchased:stock.quantityPurchased,
             amountInvested: stock.amountInvested,
             purchaseStrategy:stock.purchaseStrategy
         });

       })
   }


   updateStock=(e)=>{
    e.preventDefault();
    let stock = {
             name: this.state.name,
             pricePurchased : this.state.pricePurchased,
             purchaseDate : this.state.purchaseDate.toLocaleDateString(),
             quantityPurchased:this.state.quantityPurchased,
             amountInvested: this.state.pricePurchased * this.state.quantityPurchased,
             purchaseStrategy:  this.state.purchaseStrategy
    }
  
    console.log(stock);
   StockService.updateStocks(stock,this.state.id).then(res=>{
      
     this.props.history.push('/');

   })

}


   
   cancelRedirect=()=>{
     this.props.history.push('/');
   }

   changeNameHandler=(event)=>
   {
       this.setState({name : event.target.value});
   }

   changePriceHandler=(event)=>
   {
       this.setState({pricePurchased : event.target.value});
   }
  
   changeDatehandler=(date)=>
   {
    this.setState({
        purchaseDate: date
    })
   }

   changeQuantityHandler=(event)=>{
       this.setState({quantityPurchased:event.target.value});
   }

   changeAmountInvestedHandler=(event)=>{
       this.setState({amountInvested: event.target.value});
   }

   strategyHandler=(event)=>{
    this.setState({purchaseStrategy: event.target.value});
}



    render() {
        return (
            <div>
                <div className="container">
                      
                      <div className="row">
                          <div className="card col-md-6 offset-md-3 offset-md-3">
                              <h3 className="text-center">Update a Stock</h3>
                               <div className="card-body">
                                       <form>
                                           <div className="form-group">
                                               <label>Stock Name</label>
                                               <input placeholder="name" name="name" className="form-control"
                                                  value={this.state.name} onChange={this.changeNameHandler}/>
                                           </div>
                                           <div className="form-group">
                                               <label>Buy price</label>
                                               <input placeholder="Buy price" name="pricePurchased" className="form-control"
                                                  value={this.state.pricePurchased} onChange={this.changePriceHandler}/>
                                           </div>
                                           
                                           <div className="form-group">
                                                 <label>Buy Date</label>
                                                    <DatePicker
                                                      selected={ this.state.purchaseDate }
                                                      onChange={ this.changeDatehandler }
                                                       name="startDate"
                                                       dateFormat="MM/dd/yyyy"
                                                     />
                                             </div>


                                           <div className="form-group">
                                               <label>Quantity</label>
                                               <input placeholder="Quantity" name="quantityPurchased" className="form-control"
                                                  value={this.state.quantityPurchased} onChange={this.changeQuantityHandler}/>
                                           </div>
                                           <div className="form-group">
                                               <label>Amount Invested</label>
                                               <input placeholder="Amount Invested" name="amountInvested" className="form-control"
                                                  value={this.state.pricePurchased * this.state.quantityPurchased} readOnly/>
                                           </div>

                                          <div className="form-group">
                                               <label>Buy Strategy</label>
                                               <input placeholder="Buy Strategy" name="puchaseStrategy" className="form-control"
                                                  value={this.state.purchaseStrategy} onChange={this.strategyHandler}/>
                                           </div>


                                           <button className="btn btn-success" onClick={this.updateStock}>Save</button>
                                           <button className="btn btn-danger" onClick={this.cancelRedirect} style={{marginLeft: "10px"}}>Cancel</button>
                                       </form>
                               </div>

                          </div>
                      </div>
                </div>
            </div>
        );
    }
}

export default UpdateStockComponent;