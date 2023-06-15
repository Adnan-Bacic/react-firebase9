import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const useUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [authUser, setAuthUser] = useState(user)

    useEffect(() => {
        //auth changes
        onAuthStateChanged(auth, (currentAuthUser) => {
            setAuthUser(currentAuthUser)
        })
    }, [auth])

    const signOutUser = () => {
        const auth = getAuth()
        try {
            signOut(auth)
        } catch (e) {
            console.log(e);
        }
    }

    return {
        authUser,
        signOutUser
    }
}

export default useUser