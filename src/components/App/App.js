import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react'
import Menu from '../Menu'
import ProductList from '../ProductList'
import CartList from '../CartList'
import Order from '../Order'
import style from './App.css'

class App extends Component {

    
   getOpcion(part) { 
    this.getData(part,1);
    this.setState({opcion:part, options:  ["reloj", "videjuego","camisa"] });
  }

  getData(product,page){
    fetch('https://node-red-nxdup.mybluemix.net/productos/'+product+'/'+page)
    .then(res => res.json())
    .then((data) => {
      if(data.message!=undefined){
        return;
      }
      this.setState({ products: data.data.products })
    })
    .catch(this.setState({ products: []}))
  }

  state = {
    openOrder: true,
    total: 0,
    sum: 0,
    products: [],
    cart: [],
    options: ["reloj", "videojuego", "camisa"],
  }
  constructor(props) {
    super(props)
    this.guardaProducto = this.guardaProducto.bind(this)
    this.agregarProdcuto = this.agregarProdcuto.bind(this)
    this.eliminaProducto = this.eliminaProducto.bind(this)
    this.handlerOpenOrder = this.handlerOpenOrder.bind(this)
    this.limpiaCarrito = this.limpiaCarrito.bind(this)
    this.getOpcion = this.getOpcion.bind(this);
 
  }

  limpiaCarrito() {
    this.setState({
      openOrder: true,
      total: 0,
      sum: 0,
      products: [],
      cart: [],
      options: ["reloj", "videojuego", "camisa"],
    });
  }

  sumaProductos(prods) {
    var total = 0
    prods.forEach(product => total+=product.order)
    this.setState({total: total})
  }

  sumaTotal(prods) {
    var sum = 0
    prods.forEach(product => sum += product.PRICE)
    this.setState({sum: sum})
  }

  agregarProdcuto(indexCart, indexProduct){
    var statusCopy = Object.assign({}, this.state);
      statusCopy.cart[indexCart].total += statusCopy.cart[indexCart].price
      statusCopy.cart[indexCart].order += 1
      this.setState(statusCopy)
      this.sumProducts(statusCopy.cart)
      this.sumTotal(statusCopy.cart)

  }

  eliminaProducto(productId) {
    let product = this.state.products.find(p => p.ID === productId);
    let indexProduct = this.state.products.findIndex(x => x.ID === product.ID)
    let cart = this.state.cart.find(p => p.key === productId)
    if (undefined == cart ||  cart == null) {
      alert("Producto no existe en carrito de compras");
      return;
    }
    let indexCart = this.state.cart.findIndex(x => x.ID === cart.ID)

    var statusCopy = Object.assign({}, this.state);
    if(statusCopy.cart[indexCart].total === statusCopy.cart[indexCart].price ){
      indexCart !== -1 && statusCopy.cart.splice( indexCart, 1 );
      statusCopy.total=0
      statusCopy.sum=0
      this.setState(statusCopy)
      alert('El producto fue eliminado del carrito de compras')
    } else {
      statusCopy.cart[indexCart].total -= statusCopy.cart[indexCart].price
      statusCopy.products[indexProduct].status += 1
      statusCopy.cart[indexCart].order -= 1
      statusCopy.total -= 1
      statusCopy.sum -= statusCopy.cart[indexCart].price
      this.setState(statusCopy)
    }
  }

  guardaProducto(productId) {
    let product = this.state.products.find(p => p.ID === productId);
    let indexProduct = this.state.products.findIndex(x => x.ID === product.ID)

    var productCart = {
      key: product.ID,
      NAME: product.NAME,
      IMAGE: product.IMAGE,
      PRICE: product.PRICE,
      order: 1,
      total: product.price
    }

    var exist = this.state.cart.find(p => p.key === productId)
    if (undefined !== exist && exist !== null) {
      alert("Producto ya existe en el carrito")
    }else{
      var cartCopy=this.state.cart.concat([productCart]);
      var statusCopy = Object.assign({}, this.state);
      this.setState({
        cart: cartCopy,
        statusCopy
      })
     
      this.sumaProductos(cartCopy)
      this.sumaTotal(cartCopy)
    }
  }

  handlerOpenOrder(event) {
    event.preventDefault()
    this.setState({ openOrder: true })
  }

  renderOpenOrder() {
    if (this.state.openOrder) {
      return (
        <Order
          sum={this.state.sum}
          onClearCart={this.limpiaCarrito}
        />
      )
    }
  }

  render() {
    return (
      <Container className={style.root}>
        <Menu/>
        <Grid>
          <Grid.Column width={12}>
            <ProductList
              products={this.state.products}
              getOpcion={this.getOpcion}
              onSaveProduct={this.guardaProducto}
              onIncrementProduct={this.guardaProducto}
              onRemoveProduct={this.eliminaProducto}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <CartList
              items={this.state.cart}
              total={this.state.total}
              onOpenOrder={this.handlerOpenOrder}
            />
            {this.renderOpenOrder()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default App;
