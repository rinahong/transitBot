import MenuBar from './MenuBar'

const Layout = (props) => {
  const {user, onSignOut = () => {}} = props;
  return (
    <div style={{height:"100%"}}>
      <MenuBar />
      {props.children}
      <style jsx global>{`
        html,body, #__next{
          margin: 0;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default Layout
