import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const useUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [authUser, setAuthUser] = useState(user)

    useEffect(() => {
        //auth changes
        onAuthStateChanged(auth, (currentAuthUser) => {
            console.log('cau', currentAuthUser)
            setAuthUser(currentAuthUser)
        })
    }, [auth])

    const signOutUser = () => {
        const auth = getAuth()
        signOut(auth)
    }

    return {
        authUser,
        signOutUser
    }
}

export default useUser