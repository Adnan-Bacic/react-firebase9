import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const useCollection = () => {
    const [books, setBooks] = useState([])
    const [booksWhere, setBooksWhere] = useState([])

    const useGetAll = () => {
        useEffect(() => {
            const get = async () => {
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
            }

            get()
        }, [])
    }

    const useGetAllWhere = () => {
        const auth = getAuth()

        useEffect(() => {
            const get = async () => {
                if (auth.currentUser === null){
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
            }

            get()
        }, [auth.currentUser])
    }

    return {
        useGetAll,
        books,
        useGetAllWhere,
        booksWhere,
    }
}

export default useCollection