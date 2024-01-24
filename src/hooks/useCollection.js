import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const useCollection = () => {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [booksWhere, setBooksWhere] = useState([])
    const [isLoadingWhere, setIsLoadingWhere] = useState(false)


    const useGetAll = () => {
        useEffect(() => {
            const get = async () => {
                setIsLoading(true)
                const colRef = collection(db, 'books')

                const querySnapshot = await getDocs(colRef);

                const docs = []

                querySnapshot.forEach((doc) => {
                    docs.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });

                setBooks(docs)
                setIsLoading(false)
            }

            get()
        }, [])
    }

    const useGetAllWhere = () => {
        const auth = getAuth()

        useEffect(() => {
            const get = async () => {
                setIsLoadingWhere(true)
                if (auth.currentUser === null){
                    setIsLoadingWhere(false)
                    return
                }

                const colRef = collection(db, 'books')

                const q = query(colRef, where('userUid', '==', auth.currentUser.uid))

                const querySnapshot = await getDocs(q);

                const docs = []

                querySnapshot.forEach((doc) => {
                    docs.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });

                setBooksWhere(docs)
                setIsLoadingWhere(false)
            }

            get()
        }, [auth.currentUser])
    }

    return {
        useGetAll,
        books,
        useGetAllWhere,
        booksWhere,
        isLoading,
        isLoadingWhere
    }
}

export default useCollection