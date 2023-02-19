import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import format from '../util'

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product : null,
        }
    }
    openModal=(product)=>{
        this.setState({product})
    }
    closeModal = ()=>{
        this.setState({product: null});
    }
    render() {
        const {product} = this.state;
        return (
            <div>
                <Fade bottom cascade>
                <ul className="products row">
                    {this.props.products.map((product)=>(
                        <li key={product.id} className={product.coll}>
                            <div className="product">
                                <a href={"#" + product.id} onClick={()=>this.openModal(product)}>
                                    <img src={product.image} alt={product.tittle}></img>
                                    <p>{product.tittle}</p>
                                </a>
                                <div className="prod-price">
                                    <span><div>{format(product.price)}</div>
                                    <button onClick={()=>{this.props.addCart(product)}} className="button primary">add toCart</button></span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className="close" onClick={this.closeModal}>x</button>
                        <div>Modal</div>
                        <div className="product-zoom row">
                            <div className="col-lg-4">
                                <img src={product.image} alt={product.tittle}></img>
                            </div>
                            <div className="description col-lg-8">
                                <p><strong>{product.tittle}</strong></p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Avaible Size:{" "}
                                    {product.avaibaleSize.map((x)=>(
                                        <span>
                                            {" "}
                                            {x}
                                            {" "}
                                        </span>
                                    ))}
                                </p>
                                <p>
                                    <div className="price">
                                        {format(product.price)}
                                        <button className="button" onClick={()=>{
                                            this.props.addCart(product);
                                            this.closeModal();
                                        }}>Add cart</button>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </Zoom>
            </Modal>
                )}
            </div>
            
            
        )
    }
}
