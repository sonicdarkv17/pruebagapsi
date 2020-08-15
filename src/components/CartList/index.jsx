import React, { Component } from 'react'
import { Card, Icon, Button, Grid } from 'semantic-ui-react'

import Cart from '../Cart'

class CartList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      console.log("listo")  
      console.log(prevProps)
    }
  }

  render() {
    return(
      <Card>
        <Card.Content>
          <Card.Header>
            Carrito de Compras
            <Icon size="large"  />
          </Card.Header>
        </Card.Content>
        <Card.Content>
        {this.props.items.map(p => {
          return (
          <Cart
            key={p.ID}
            IMAGE={p.IMAGE}
            NAME={p.NAME}
            PRICE={p.PRICE}
            DESCRIPTION={p.DESCRIPTION}
            order={1}
          />
          )
        })}
        </Card.Content>
        <Card.Content extra>
          <Button
            basic
            color='green'
            compact
            size="medium"
            onClick={this.props.onOpenOrder}
            >Realizar al Pago ({this.props.total} productos)
          </Button>
        </Card.Content>
      </Card>
    )
  }
}

export default CartList;
