import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import useLogin from '../hooks/useLogin';
import useSignup from '../hooks/useSignup';

const Auth = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const login = useLogin()
    const signup = useSignup()
    const user = useUser()

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const logOut = () => {
        user.signOutUser()
    }

    const handleLogin = (e) => {
        e.preventDefault()

        login.loginEmailPassword(values.email, values.password)
    }

    const handleSignup = (e) => {
        e.preventDefault()

        signup.signupEmailPassword(values.email, values.password)
    }

    return (
        <div>
            {user.authUser === null && (
                <>
                <h2>Signed out</h2>
                </>
            )}
            {user.authUser !== null && (
                <>
                <h2>Signed in</h2>
                <p>email: {user.authUser.email}</p>

                    <h2>Info:</h2>
                    {user.authUser.providerData.map((profile) => {
                        return(
                            <div key={profile.uid}>
                            <p>
                                providerId: {profile.providerId}
                            </p>
                            <p>
                                uid: {profile.uid}
                            </p>
                            <p>
                                displayName: {profile.displayName}
                            </p>
                            <p>
                                email: {profile.email}
                            </p>
                            <p>
                                photoURL: {profile.photoURL}
                            </p>
                            <p>
                                phoneNumber: {profile.phoneNumber}
                            </p>
                            </div>
                        )
                    })}
                </>
            )}
            <button onClick={logOut}>signout</button>
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>
                <label htmlFor="email-signup">Email:</label>
                <input type="email" name="email" id='email-signup' onChange={handleInputChange} required />

                <label htmlFor="password-signup">Password:</label>
                <input type="password" name="password" id='password-signup' onChange={handleInputChange} required />

                <button>Signup</button>
            </form>
            <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <label htmlFor="email-login">Email:</label>
                <input type="email" name="email" id='email-login' onChange={handleInputChange} required />

                    <label htmlFor="password-login">Password:</label>
                <input type="password" name="password" id='password-login' onChange={handleInputChange} required />

                    <button>Login</button>
            </form>
        </div>
    );
};

export default Auth;