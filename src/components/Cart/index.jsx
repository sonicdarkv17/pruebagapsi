import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'



function Cart(props){
  return(
    <Feed>
      <Feed.Event>
        <Feed.Label image={props.IMAGE} />
        <Feed.Content>
          <Feed.Date content={props.NAME} />
          <Feed.Summary>
            {props.DESCRIPTION}
            $ {props.PRICE}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default Cart;
