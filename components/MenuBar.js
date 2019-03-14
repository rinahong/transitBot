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
  <Link href="/search">
    <button>Search</button>
  </Link>
  <Link href="/map">
    <button>Map</button>
  </Link>
  <Link href="/user">
    <button>My Page</button>
  </Link>
  </div>
)

export default MenuBar
