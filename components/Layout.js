import Header from './Header'
import MenuBar from './MenuBar'

const Layout = (props) => (
  <div style={{height:"100%"}}>
    {props.children}
    <MenuBar />
    <style jsx global>{`
      html,body, #__next{
        margin: 0;
        height: 100%;
      }
    `}</style>
  </div>
)

export default Layout
