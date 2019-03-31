import Link from 'next/link';

const menuBottom = {
  position: '-webkit-sticky',
  position: 'sticky',
  bottom: 0,
  width: '50%',
  padding: '5px',
  margin: '0 auto'

}

const MenuBar = (props) => {
  const {user, onSignOut = () => {}} = props;
  console.log("---onSignOut", onSignOut)
  return (
    <div style={menuBottom}>
    <a href="/search">
      <button>Search</button>
    </a>
    <a href="/map">
      <button>Map</button>
    </a>
    <a href="/user">
      <button>My Page</button>
    </a>
    {
      user ?
      <span>Welcome, {user}</span>
      :
      ([<a href="/register">
        <button>Register</button>
      </a>,
      <a href="/login">
        <button>Login</button>
      </a>])
    }

    </div>
  )
}

export default MenuBar
