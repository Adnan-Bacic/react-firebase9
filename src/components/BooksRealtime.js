import React from 'react';
import useCollectionRealtime from '../hooks/useCollectionRealtime';
import './books.css'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const BooksRealtime = () => {
    const books = useCollectionRealtime()
    books.useGetAll()
    books.useGetAllWhere()

    return (
        <>
        <h2>Books realtime</h2>
        <div className='books'>
            {books.books.map((book) => {
                return (
                    <div key={book.id} className='book'>
                        <p>author: {book.author}</p>
                        <p>title: {book.title}</p>
                        <p>isfav: {book.isFav.toString()}</p>
                    </div>
                )
            })}
        </div>
            <h2>Books realtime where</h2>
            <div className='books'>
                {books.booksWhere.map((book) => {
                    const toggleFav = () => {
                        const docRef = doc(db, 'books', book.id)

                        updateDoc(docRef, {
                            isFav: !book.isFav
                        })
                    }

                    const deleteBook = () => {
                        const docRef = doc(db, 'books', book.id)

                        deleteDoc(docRef)
                    }

                    return (
                        <div key={book.id} className='book'>
                            <p>author: {book.author}</p>
                            <p>title: {book.title}</p>
                            <p>isfav: {book.isFav.toString()}</p>
                            <button onClick={toggleFav}>toggle fav</button>
                            <button onClick={deleteBook}>delete</button>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default BooksRealtime;