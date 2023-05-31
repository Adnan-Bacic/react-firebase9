import { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const useLogin = () => {
    const [error, setError] = useState(null)

    const loginEmailPassword = async (email, password) => {
        try {
            const auth = getAuth();
            const res = await signInWithEmailAndPassword(auth, email, password)

            if (!res) {
                throw new Error('could not login')
            }

            setError(null)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    return {
        loginEmailPassword,
        error
    }
}

export default useLogin