import Link from 'next/link';

const menuBottom = {
  position: '-webkit-sticky',
  position: 'sticky',
  bottom: 0,
  width: '50%',
  padding: '5px',
  margin: '0 auto'

}

const MenuBar = () => (
  <div style={menuBottom}>
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
