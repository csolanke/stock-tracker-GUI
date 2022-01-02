import React, { Component } from 'react';
import StockService from '../services/StockService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateStockComponent extends Component {

 
   constructor(props)
   {
       super(props);
       this.state ={
           name : '',
           pricePurchased : '',
           purchaseDate : new Date(),
           quantityPurchased:'',
           amountInvested: '',
           purchaseStrategy:'',
           nameError:'',
           priceError:'',
           dateError:'',
           quantityerror:'',
           strategyError:'',
           responseErrorMessage:''
         
           


       }

       this.changeNameHandler = this.changeNameHandler.bind(this);
       this.changePriceHandler = this.changePriceHandler.bind(this);
       this.changeDatehandler = this.changeDatehandler.bind(this);
       this.changeQuantityHandler=this.changeQuantityHandler.bind(this);
       this.changeAmountInvestedHandler=this.changeAmountInvestedHandler.bind(this)
       this.saveStock = this.saveStock.bind(this);
       this.cancelRedirect = this.cancelRedirect.bind(this);
       this.strategyHandler= this.strategyHandler.bind(this);
   }



    validate=()=>{

        let nameError = '';
        let priceError ='';
        let dateError='';
        let quantityerror ='';
        let strategyError=''
      
        
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

        if(!this.state.purchaseStrategy)
        {
            strategyError='buy Strategy is required';
        }
        
        if(nameError || priceError || dateError || quantityerror ||strategyError)
        {
            this.setState({nameError,priceError,dateError,quantityerror,strategyError});
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
            purchaseDate  : this.state.purchaseDate.toLocaleDateString(),
            quantityPurchased: this.state.quantityPurchased,
            amountInvested: this.state.pricePurchased * this.state.quantityPurchased,
            purchaseStrategy:this.state.purchaseStrategy
        };

    StockService.createStock(stock).then(res=>{   
        if(res.data.message)
        {
           this.setState({responseErrorMessage : res.data.message})
        }
        if(!res.data.message)
        {
            this.props.history.push('/')
        }
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
                              <h3 className="text-center">Add New Stock to Holding</h3>
                                 <div align="center">  
                                 <p style={{color:'red'}}>{this.state.responseErrorMessage}</p>
                                 </div>
                               <div className="card-body">
                                       <form>
                                           <div className="form-group">
                                               <label>Stock Name</label>
                                               <input placeholder="name" name="name" className="form-control"
                                                  value={this.state.name} onChange={this.changeNameHandler} />
                                           </div>
                                           <div style={{color:'red'}}>{this.state.nameError}</div>
                                           <div className="form-group">
                                               <label>Buy price</label>
                                               <input placeholder="Buy price" name="pricePurchased" className="form-control"
                                                  value={this.state.pricePurchased} onChange={this.changePriceHandler}/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.priceError}</div>
                                           
                                           <div className="form-group">
                                                 <label>Buy Date</label>
                                                    <DatePicker
                                                      selected={ this.state.purchaseDate }
                                                      onChange={ this.changeDatehandler }
                                                       name="startDate"
                                                       dateFormat="MM/dd/yyyy"
                                                     />
                                             </div>

                                           <div style={{color:'red'}}>{this.state.dateError}</div>
                                           <div className="form-group">
                                               <label>Quantity</label>
                                               <input placeholder="Quantity" name="quantityPurchased" className="form-control"
                                                  value={this.state.quantityPurchased} onChange={this.changeQuantityHandler}/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.quantityerror}</div>
                                           <div className="form-group">
                                               <label>Amount Invested</label>
                                               <input placeholder="Amount Invested" name="amountInvested" className="form-control"
                                                  value={this.state.pricePurchased * this.state.quantityPurchased} readOnly/>
                                           </div>
                                         

                                           <div className="form-group">
                                               <label>Buy Strategy</label>
                                               <input placeholder="Buy Strategy" name="purchaseStrategy" className="form-control"
                                                  value={this.state.purchaseStrategy} onChange={this.strategyHandler}/>
                                           </div>
                                           <div style={{color:'red'}}>{this.state.strategyError}</div>


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