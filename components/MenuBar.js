import Link from 'next/link';
import React, {Component} from 'react'

const MenuBar = (props) => (
  <div>
  <a href="/search">
    <button>Search</button>
  </a>
  <a href="/map">
    <button>Map</button>
  </a>
  <a href="/history">
    <button>Search History</button>
  </a>
  <a href="/alarm">
    <button>Alarms</button>
  </a>
  </div>
)

export default MenuBar
