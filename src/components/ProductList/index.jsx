import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import Product from '../Product'
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

function ProductList(props) {
  return (
    <Segment>
      <TextInput onRequestOptions={props.getOpcion} options={props.options} trigger=""/>

      <Grid>
        <Grid.Row columns={4}>
          {props.products.map(p => {
            return (
              <Grid.Column>
                <Product
                  key={p.ID}
                  name={p.NAME}
                  picture={p.IMAGE}
                  price={p.PRICE}
                  marca={p.DESCRIPTION}
                  onSaveProduct={() => props.onSaveProduct(p.ID)}
                  onIncrementProduct={() => props.onIncrementProduct(p.ID)}
                  onRemoveProduct={() => props.onRemoveProduct(p.ID)}
                />
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default ProductList
