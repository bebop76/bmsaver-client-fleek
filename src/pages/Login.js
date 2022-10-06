import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import MenuNav from "../components/MenuNav"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (

        <React.Fragment>

            <MenuNav />
            <form className="login" onSubmit={handleSubmit}>
                <h3>LOGIN</h3>
                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login" disabled={isLoading}>Login</button>
                {/* <p>Don't have an account? <a href="/signup">Register here</a></p> */}
                {error && <div className="error"><b>{error}</b></div>}
            </form>
        </React.Fragment>
    )
}

export default Login