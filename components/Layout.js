import MenuBar from './MenuBar'
import React, {Component} from 'react'
const Layout = (props) => (
  <div style={{height:"100%"}}>
    <MenuBar />
    {props.children}
  </div>
)

export default Layout
