import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [userLoginInput, setUserLoginInput] = useState({});
    const [errorMessages, setErrorMessages] = useState('');

    console.log(errorMessages);

    const users = [
        {
            name: 'user1',
            password: 'password1'
        },
        {
            name: 'user2',
            password: 'password2'
        },
    ];

    const errors = {
        userName: 'invalid username',
        password: 'invalid password'
    }

    const renderErrorMessage = (err) => {
        err === errorMessages.name && (
            <div>${errorMessages.message}</div>
        )
    }

    const handleChange = (e) => {
        setUserLoginInput(prevInput => ({
            ...prevInput,
            [e.target.name]: e.target.value
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const found = users.find(user => user.name === userLoginInput.name);

        if(found){
           if(found.password === userLoginInput.password) {
            navigate("/home");
           } else {
            setErrorMessages({ name: 'password', message: errors.password});
            alert(errorMessages.message);
           } 

        } else {
            setErrorMessages( { name: "userName", message: errors.userName });
            alert(errorMessages.message);
        }
    }

    return (
        <div className="login">
            <form className="login-box" onSubmit={handleLogin}>
                <label htmlFor="name">User Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    autoFocus 
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    onChange={handleChange} 
                />
                <button className="button">LOG IN</button>
            </form>
        </div>
    );
}
 
export default Login;