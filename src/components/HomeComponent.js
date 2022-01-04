import React, { Component } from 'react';

class HomeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stocks: [],
            numberOfStocks:''
        }
    };


    componentDidMount() {
    }

    

    render() {
        return (
            <div>
              <h1>Welcome Chandrakant</h1>  
                
                

              

            </div>
        );
    }
}

export default HomeComponent;