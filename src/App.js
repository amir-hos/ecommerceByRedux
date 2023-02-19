import React , {Component} from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/products';
import data from './data.json';
class App extends Component  {
  constructor(){
    super();
    this.state={
      products : data.products,
      cartItem : localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
      size:"",
      sort:"",
    };
  }
  createOrder = (order) =>{
    alert("you need to submit order by " + order.name);
  }
  removeCart=(product)=>{
    const cartItem = this.state.cartItem.slice();
    this.setState({cartItem: cartItem.filter((x)=> x.id !== product.id),});
    localStorage.setItem("cartItem" , JSON.stringify(cartItem.filter((x)=> x.id !== product.id)));
  }
  addCart=(product)=>{
    const cartItem = this.state.cartItem.slice();
    let alreadyIncart = false;
    cartItem.forEach((item)=>{
      if(item.id === product.id){
        item.count++;
        alreadyIncart = true;
      }
    })
    if(!alreadyIncart){
      cartItem.push({ ...product , count:1})
    }
    this.setState({cartItem});
    localStorage.setItem("cartItem" , JSON.stringify(cartItem));
  }
  filterSort(e){
  
    const sort = e.target.value;  
    console.log(e.target.value);
    this.setState((state)=>({
      sort : sort,
      products : this.state.products.slice().sort((a,b)=>
        sort === "Lowest" 
        ? a.price > b.price 
        ? 1 : -1
        : sort === "Highest" 
        ? a.price < b.price
        ? 1 : -1
        :
        a.id > b.id ? 1 : -1
      
      ),
      
    }))
  }
  filterSize=(e)=>{
    console.log(e.target.value)
    if(this.state.value === ""){
      this.setState({size: e.target.value , products: data.products})
    }else
    {
      this.setState({
        size:e.target.value,
        products:data.products.filter((product)=>product.avaibaleSize.indexOf(e.target.value) >=0), 
      })
    }
  }
  render(){
    return (
      <div className="App">
        <nav className="navbar ">
            <a className="navbar-brand" href="/">
              Shopping cart
            </a>
        </nav>
        <div className="list row">
          <div className="content col-lg-9">
            <Filter 
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterSort={this.filterSort}
              filterSize={this.filterSize}
            />
            <Products
             products={this.state.products}
             addCart={this.addCart}
              />
          </div>
          <div className="aside col-lg-3">
            <Cart
              cartItem={this.state.cartItem}
              removeCart={this.removeCart}
              createOrder={this.createOrder}
            />
          </div>
        </div>
        <footer>
          copyRight All right
        </footer>
      </div>
    );
  }
}

export default App;
