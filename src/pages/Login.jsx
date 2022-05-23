import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

const submit = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true')
}

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={submit}>
            <MyInput type="text" placeholder="login"/>
            <MyInput type="password" placeholder="password"/>
            <MyButton>Login</MyButton>
        </form>
    </div>
  )
}

export default Login