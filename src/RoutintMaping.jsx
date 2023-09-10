//import { useState } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
// import { Navbar, NavbarBrand, Nav, NavItem, NavLink}  from 'reactstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'
// import Home from './views/Home'
// import About from './views/About'
import Auth from './views/Auth'
import SignUp from './views/SignUp'
import Login from './views/Login'
import ToDoList from './views/ToDoList'

function RoutintMaping() {

  //const [collapsed, setCollapsed] = useState(true);
  //const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      {/* <header>
        <Navbar light expand="lg">
          <NavbarBrand to="/" className="mr-auto">ToDoList</NavbarBrand>
            <Nav className="ml-auto" navbar>  
              <NavItem>
                <NavLink tag ={Link} activeClassName="active" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag ={Link} activeClassName="active" to="/auth/sign_up">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag ={Link} activeClassName="active" to="/auth/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag ={Link} activeClassName="active" to="/todo">ToDo</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag ={Link} activeClassName="active" to="/about">About</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </header> */}
      <Routes>
        <Route path="/" element={ <Auth />} >
          <Route path="sign_up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route index element={<Navigate to="login" />} />
        </Route>
        <Route path="/todo" element={ <ToDoList />} />
      </Routes>
    </>
  )
}

export default RoutintMaping
