import { useState ,useEffect } from 'react'

function Register({ showRegister, setShowRegister, setShowLogin }) {

    const [namePlaceHolder, setNamePlaceHolder] = useState('Enter your name')
    const [emilPlaceHolder, setEmilPlaceHolder] = useState('Enter your email')
    const [password1PlaceHolder, setPassword1PlaceHolder] = useState('Enter password')
    const [password2PlaceHolder, setPassword2PlaceHolder] = useState('Confirm password')

    const [nameBorder, SetNameBorder] = useState({ 'border-color': 'black' })
    const [emilBorder, SetEmilBorder] = useState({ 'border-color': 'black' })
    const [passwor1Border, SetPasswor1Border] = useState({ 'border-color': 'black' })
    const [passwor2Border, SetPasswor2Border] = useState({ 'border-color': 'black' })

    const [err, setErr] = useState()


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        setErr()
        setNamePlaceHolder('Enter your name')
        setEmilPlaceHolder('Enter your email')
        setPassword1PlaceHolder('Enter password')
        setPassword2PlaceHolder('Confirm password')
        SetNameBorder({ 'border-color': 'black' })
        SetEmilBorder({ 'border-color': 'black' })
        SetPasswor1Border({ 'border-color': 'black' })
        SetPasswor2Border({ 'border-color': 'black' })


        if(!name){
            setNamePlaceHolder('Enter your email (Required)')
            SetNameBorder({ 'border-color': 'red' })
        } 
        if (!email) {
            setEmilPlaceHolder('Enter your email (Required)')
            SetEmilBorder({ 'border-color': 'red' })
        }
        if (!password) {
            setPassword1PlaceHolder('Enter your password (Required)')
            SetPasswor1Border({ 'border-color': 'red' })
        }
        if (!password2) {
            setPassword2PlaceHolder('Enter your password (Required)')
            SetPasswor2Border({ 'border-color': 'red' })
        }

        e.preventDefault()
        if ((password !== password2) && name && email && password && password2 ) {
            setErr(<h1>The password doesn't match</h1>)
            SetPasswor2Border({ 'border-color': 'red' })
        } else if(name && email && password) {
            const userData = {
                name,
                email,
                password,
            }
            register(userData)
        }
    }

    useEffect(() => {
        setNamePlaceHolder('Enter your name')
        setEmilPlaceHolder('Enter your email')
        setPassword1PlaceHolder('Enter password')
        setPassword2PlaceHolder('Confirm password')
        SetNameBorder({ 'border-color': 'black' })
        SetEmilBorder({ 'border-color': 'black' })
        SetPasswor1Border({ 'border-color': 'black' })
        SetPasswor2Border({ 'border-color': 'black' })
        setErr()

        setFormData({
            name: '',
            email: '',
            password: '',
            password2: '',
        })

    }, [showRegister])

    const register = async (userData) => {
        await fetch("http://localhost:5000/api/users", {
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
                setErr(<h1>A user with this email already exists</h1>)
                throw new Error('the user already exists ')
            }
        }).then(() => {
            setShowRegister({ display: 'none' })
            setShowLogin({ display: 'flex' })
        })
    }

    return (
        <div id="register" style={showRegister}>
            <section id='form'>
                {err}
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            placeholder= {namePlaceHolder}
                            style={nameBorder}
                            autocomplete="off"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            placeholder={emilPlaceHolder}
                            style={emilBorder}
                            autocomplete="off"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            placeholder={password1PlaceHolder}
                            style={passwor1Border}
                            autocomplete="off"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            name='password2'
                            value={password2}
                            placeholder= {password2PlaceHolder}
                            style={passwor2Border}
                            autocomplete="off"
                            onChange={onChange}
                        />
                    </div>
                    <div >
                        <button type='submit' id ='btn-register'>Register</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register