import React, { Component } from 'react';
import StockService from '../services/StockService';

class CreateStockComponent extends Component {

 
   constructor(props)
   {
       super(props);
       this.state ={
           name : '',
           pricePurchased : '',
           purchaseDate : '',
           quantityPurchased:'',
           amountInvested:'',
           nameError:'',
           priceError:'',
           dateError:'',
           quantityerror:'',
           amountInvestedError:''

       }

       this.changeNameHandler = this.changeNameHandler.bind(this);
       this.changePriceHandler = this.changePriceHandler.bind(this);
       this.changeDatehandler = this.changeDatehandler.bind(this);
       this.changeQuantityHandler=this.changeQuantityHandler.bind(this);
       this.changeAmountInvestedHandler=this.changeAmountInvestedHandler.bind(this)
       this.saveStock = this.saveStock.bind(this);
       this.cancelRedirect = this.cancelRedirect.bind(this);
   }



    validate=()=>{

        let nameError = '';
        let priceError ='';
        let dateError='';
        let quantityerror ='';
        let amountInvestedError='';
        
        if(!this.state.name)
        {
            nameError="stock name is required";
        
        }
        if(!this.state.pricePurchased)
        {
            priceError = "price is required";
            
        }
        if(!this.state.purchaseDate)
        {
            dateError="date is required";
            
        }
        if(!this.state.quantityPurchased)
        {
            quantityerror="quantity is required";
            
        }
        if(!this.state.amountInvested)
        {
            amountInvestedError="amount Invested  is required";
            
        }
        if(nameError || priceError || dateError || quantityerror|| amountInvestedError)
        {
            this.setState({nameError,priceError,dateError,quantityerror,amountInvestedError});
            return false;
        }

        return true;
    }


   saveStock=(e)=>{
       e.preventDefault();
        const isValid =this.validate();
       
       if(isValid)
       {
        let stock = {name : this.state.name,
            pricePurchased : this.state.pricePurchased,
            purchaseDate  : this.state.purchaseDate,
            quantityPurchased: this.state.quantityPurchased,
            amountInvested: this.state.amountInvested
        };

    console.log(stock);
    StockService.createStock(stock).then(res=>{   
    this.props.history.push('/')
        })
       }
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
   changeDatehandler=(event)=>
   {
      this.setState({purchaseDate: event.target.value});
   }

   changeQuantityHandler=(event)=>{
       this.setState({quantityPurchased:event.target.value});
   }

   changeAmountInvestedHandler=(event)=>{
       this.setState({amountInvested: event.target.value});
   }



    render() {
        return (
            <div>
                <div className="container">
                      
                      <div className="row">
                          <div className="card col-md-6 offset-md-3 offset-md-3">
                              <h3 className="text-center">Add New Stock to Holding</h3>
                               <div className="card-body">
                                       <form>
                                           <div className="form-group">
                                               <label>Stock Name</label>
                                               <input placeholder="name" name="name" className="form-control"
                                                  value={this.state.name} onChange={this.changeNameHandler} required/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.nameError}</div>
                                           <div className="form-group">
                                               <label>Buy price</label>
                                               <input placeholder="Buy price" name="pricePurchased" className="form-control"
                                                  value={this.state.pricePurchased} onChange={this.changePriceHandler} required/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.priceError}</div>
                                           <div className="form-group">
                                               <label>Buy Date</label>
                                               <input placeholder="Buy Date" name="purchaseDate" className="form-control"
                                                  value={this.state.purchaseDate} onChange={this.changeDatehandler} required/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.dateError}</div>
                                           <div className="form-group">
                                               <label>Quantity</label>
                                               <input placeholder="Quantity" name="quantityPurchased" className="form-control"
                                                  value={this.state.quantityPurchased} onChange={this.changeQuantityHandler} required/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.quantityerror}</div>
                                           <div className="form-group">
                                               <label>Amount Invested</label>
                                               <input placeholder="Amount Invested" name="amountInvested" className="form-control"
                                                  value={this.state.amountInvested} onChange={this.changeAmountInvestedHandler} required/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.amountInvestedError}</div>

                                           <button className="btn btn-success" onClick={this.saveStock}>Save</button>
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

export default CreateStockComponent;