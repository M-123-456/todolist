import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [userLoginInput, setUserLoginInput] = useState({});
    const [errorMessages, setErrorMessages] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div>{errorMessages.message}</div>
        )
    }

    const handleChange = (e) => {
        setUserLoginInput(prevInput => ({
            ...prevInput,
            [e.target.name]: e.target.value
        }));
        console.log(userLoginInput);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const found = users.find(user => user.name === userLoginInput.name);

        if(found){
           if(found.password === userLoginInput.password) {
            navigate("/home");
           } else {
            setErrorMessages({ name: 'password', message: errors.password}) 
           } 

        } else {
            setErrorMessages( { name: "userName", message: errors.userName })
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
                {renderErrorMessage("userName")}
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    onChange={handleChange} 
                />
                {renderErrorMessage("userName")}
                <button className="button">LOG IN</button>
            </form>
        </div>
    );
}
 
export default Login;