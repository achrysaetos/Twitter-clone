import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"
import { ChakraProvider } from "@chakra-ui/react"

import "semantic-ui-css/semantic.min.css"
import "./App.css"
import { AuthProvider } from "./context/auth"
import AuthRoute from "./util/AuthRoute"
import { theme } from "./theme"

import MenuBar from "./components/MenuBar"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"

export default function App() {

  return (
    <ChakraProvider theme={theme}> {/* use custom theme from theme.js */}
      <AuthProvider> {/* pass the user and the login/logout functions from ./context/auth.js, to set/remove the user token */}
        <Router> {/* to route to different pages in the pages folder */}
          <Container> {/* semantic ui class to create margins */}
            <MenuBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/:target_username" component={Profile} />
            <AuthRoute exact path="/login" component={Login} /> {/* redirect to home if user is logged in */}
            <AuthRoute exact path="/register" component={Register} /> {/* redirect to home if user is logged in */}
          </Container>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
  
}
