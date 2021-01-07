import React, { useContext, useState } from "react"
import { Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"

import { AuthContext } from "../context/auth"

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname // the location object's url port

  const path = pathname === "/" ? "home" : pathname.substr(1) // path = name in pathname "/[name]"
  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name) // set the active item where the name matches the path

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} /> {/* logout from ../context/auth.js */}
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === "home"} onClick={handleItemClick} as={Link} to="/"/>
      <Menu.Menu position="right">
        <Menu.Item name="login" active={activeItem === "login"} onClick={handleItemClick} as={Link} to="/login"/>
        <Menu.Item name="register" active={activeItem === "register"} onClick={handleItemClick} as={Link} to="/register"/>
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}
