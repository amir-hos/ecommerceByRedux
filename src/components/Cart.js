import React, { Component, Fragment } from 'react';
import Fade from 'react-reveal/Fade';
import format from '../util'

export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            adress:"",
            showCheckout: false
        };
    }
    handleInput =(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    createOrder =(e)=>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            adress: this.state.adress,
            cartItem: this.props.cartItem,
        };
        this.props.createOrder(order);
    }
    render() {
        const {cartItem} = this.props;
        return (
            <Fragment>
                <div>
                <div className="head">
                    {cartItem.length === 0? (<div className="cart">cart is empty </div>) 
                    :
                    (<div className="chart">You have {cartItem.length} in cart {" "} </div> )}
                </div>
                <div>
                    <div className="cart">
                        <Fade left cascade >
                        <ul className="cartItem">
                            {cartItem.map((item) =>(
                                <li className="cont row" key={item.id}>
                                    <div className="col-lg-3">
                                        <img src={item.image} alt={item.tittle}></img>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="tit">{item.tittle}</div>
                                        {format(item.price)} x {item.count}{" "}
                                        <button onClick={()=>this.props.removeCart(item)}>remove</button>
                                        
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                        </Fade>
                    </div>
                    <div>
                    <div className="total">
                        total is: {" "}
                        {format(
                        cartItem.reduce((a, c) => a + c.price * c.count , 0)
                        )}
                        <button onClick={()=>{this.setState({showCheckout: true})}} className="bt">procced</button>
                     </div>
                    </div>
                    {this.state.showCheckout && (
                        <div className="reg">
                            <form onSubmit={this.createOrder}>
                                <Fade right cascade>
                                <ul className="form-container">
                                    <li className="form-group">
                                        <label>Name</label>
                                        <input name="name" type="text" className="form-control" required onChange={this.handleInput}></input>
                                    </li>
                                    <li className="form-group">
                                        <label>Email</label>
                                        <input name="email" type="email" className="form-control" required onChange={this.handleInput}></input>
                                    </li>
                                    <li className="form-group">
                                        <label>Adress</label>
                                        <input name="adress" type="text" className="form-control" required onChange={this.handleInput}></input>
                                    </li>
                                    <button onClick={this.check} type="submit">check</button>
                                </ul>
                                </Fade>
                            </form>
                        </div>
                    )}
                    
                </div>
                
                </div>
            </Fragment>
        )
    }
}
