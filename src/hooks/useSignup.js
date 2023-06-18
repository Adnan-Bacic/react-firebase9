import { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'


const useSignup = () => {
    const [error, setError] = useState(null)

    const signupEmailPassword = async (email, password) => {
        try {
            const auth = getAuth();
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if (!res) {
                throw new Error('could not complete signup')
            }

            setError(null)
        } catch (err) {
            setError(err.message)
        }
    }

    return {
        signupEmailPassword,
        error
    }
}

export default useSignup