import React from 'react';
import Header from '../../components/Header'

const Login = () => {
    return (
        <div>
            <Header/>
            <div>Login</div>
            <button onClick={() => {alert('click')}}>
                Login
            </button>
        </div>
    )
}
export default Login