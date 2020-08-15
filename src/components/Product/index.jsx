import React from 'react'
import NumberFormat from 'react-number-format';
import { Card, Image, Label, Button } from 'semantic-ui-react'


function Product(props) {
  return(
    <Card style={{ marginTop: 15 }}>
      <Image size="small" src={props.picture}  />
      <Card.Content>
        <Card.Header style={{fontSize: 15}}>{props.name}</Card.Header>
        <Card.Meta>
        <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </Card.Meta>
        <Card.Description>
          <Label>{props.marca}</Label>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          compact
          color='blue'
          floated='right'
          onClick={props.onSaveProduct}
        >
          Agregar al carrito
        </Button>
      </Card.Content>
      <Card.Content extra>
        <Button.Group floated='right'>
          <Button
            compact
            onClick={props.onIncrementProduct}
            >+</Button>
          <Button
            compact
            onClick={props.onRemoveProduct}
            >-</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default Product