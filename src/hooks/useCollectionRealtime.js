import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const useCollectionRealtime = () => {
    const [books, setBooks] = useState([])
    const [booksWhere, setBooksWhere] = useState([])

    const useGetAll = () => {
        useEffect(() => {
            const get = async () => {
                const colRef = collection(db, 'books')

                const unsub = onSnapshot(colRef, (snapshot) => {
                    const docs = []

                    snapshot.docs.forEach((doc) => {
                        docs.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });

                    setBooks(docs)
                });

                return unsub
            }

            get()
        }, [])
    }

    const useGetAllWhere = () => {
        const auth = getAuth()

        useEffect(() => {
            const get = async () => {
                if (auth.currentUser === null) {
                    return
                }
                
                const colRef = collection(db, 'books')

                const q = query(colRef, where('userUid', '==', auth.currentUser.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    const docs = []

                    snapshot.docs.forEach((doc) => {
                        docs.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });

                    setBooksWhere(docs)
                });

                return unsub
            }

            get()
        }, [auth.currentUser])
    }

    return {
        useGetAll,
        books,
        useGetAllWhere,
        booksWhere
    }
}

export default useCollectionRealtime