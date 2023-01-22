import React, { useState, useEffect } from 'react'
export default function Login({ setHeader, showLogin, setShowLogin, setShowRegister, setLogedIn, hostUrl}) {

    

    const [emilPlaceHolder, setEmilPlaceHolder] = useState('Enter your email')
    const [passwordPlaceHolder, setPasswordPlaceHolder] = useState('Enter password')
    const [emilBorder, SetEmilBorder] = useState({ 'borderColor': 'black' })
    const [passworBorder, SetPassworBorder] = useState({ 'borderColor': 'black' })
    const [err, setErr] = useState()


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setEmilPlaceHolder('Enter your email')
        setPasswordPlaceHolder('Enter password')
        SetEmilBorder({ 'borderColor': 'black' })
        SetPassworBorder({ 'borderColor': 'black' })

        if (!email) {
            setEmilPlaceHolder('Enter your email (Required)')
            SetEmilBorder({ 'borderColor': 'red' })
        }
        if (!password) {
            setPasswordPlaceHolder('Enter your password (Required)')
            SetPassworBorder({ 'borderColor': 'red' })
        }
        if (email && password) {

            const userData = {
                email,
                password,
            }
            login(userData)
        }
    }

    useEffect(() => {
        setEmilPlaceHolder('Enter your email')
        setPasswordPlaceHolder('Enter password')
        SetEmilBorder({ 'borderColor': 'black' })
        SetPassworBorder({ 'borderColor': 'black' })
        setErr()
        setFormData({
            email: '',
            password: '',
        })

    }, [showLogin])

    const login = async (userData) => {
        await fetch(`${hostUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                setErr(<h1>The email or password is incorrect</h1>)
                throw new Error('Wrong info')
            }
        }).then((responseJson) => {
            localStorage.setItem('token', responseJson.token)
            localStorage.setItem('name', responseJson.name)
            setHeader("Moveslist")
            setLogedIn(true)
        })
    }

    const register = () => {
        setShowRegister({ display: 'flex' })
        setShowLogin({ display: 'none' })
    }

    return (
        <div id="login" style={showLogin}>
            <section id='form'>
                {err}
                <form onSubmit={onSubmit}>
                    <div >
                        <input
                            style={emilBorder}
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder={emilPlaceHolder}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </div>
                    <div >
                        <input
                            style={passworBorder}
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder={passwordPlaceHolder}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </div>
                    <div >
                        <button type='submit' id='btn-Login' >Login</button>
                    </div>
                </form>
                <p onClick={register} >Don't have an account register here</p>
            </section>
        </div>
    )
}