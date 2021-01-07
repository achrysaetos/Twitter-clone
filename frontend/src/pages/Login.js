import React, { useContext, useState } from "react"
import { Button, Form } from "semantic-ui-react"
import { useMutation } from "@apollo/react-hooks"
import { Heading } from "@chakra-ui/react"

import { AuthContext } from "../context/auth"
import { useForm } from "../util/hooks"
import { LOGIN_USER } from "../graphql/LOGIN_USER"

export default function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, { username: "", password: "" }) // from ../util/hooks.js

  const [loginUser, { loading }] = useMutation(LOGIN_USER, { // call the LOGIN_USER mutation
    update(_, { data: { login: userData } }) {
      context.login(userData) // set the user token and userData payload, from ../context/auth.js
      props.history.push("/") // direct to home
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function loginUserCallback() { // lets you call loginUser() inside the useForm function above
    loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}> {/* not actually submitted */}
        <Heading>Login</Heading>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange} // change the value of the input in real time
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && ( // display the errors below if they exist
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
  
}
