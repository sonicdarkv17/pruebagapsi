import React from 'react'
import { Card, Statistic, Button } from 'semantic-ui-react'
import NumberFormat from 'react-number-format';

function Order(props) {
  return(
    <Card>
      <Card.Content header='Cantidad a pagar' />
      <Card.Content extra>
        <Statistic size='mini'>
          <Statistic.Value>
          <NumberFormat value={props.sum} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Statistic.Value>
        </Statistic>
        <Button
          basic
          color='green'
          compact
          size="medium"
          floated='right'
          onClick={props.onClearCart}
          >Reiniciar
        </Button>
      </Card.Content>
    </Card>
  )
}

export default Order
