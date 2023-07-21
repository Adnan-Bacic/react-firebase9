import React from 'react';
import useCollection from '../hooks/useCollection';
import './books.css'

const Books = () => {
    const books = useCollection()
    books.useGetAll()
    books.useGetAllWhere()

    return (
        <>
        <h2>Books</h2>
        <div className='books'>
            {books.books.length === 0 && (
                <p>0 books</p>
            )}
            {books.books.map((book) => {
                return(
                    <div key={book.id} className='book'>
                    <p>author: {book.author}</p>
                    <p>title: {book.title}</p>
                    <p>isfav: {book.isFav.toString()}</p>
                    </div>
                )
            })}
        </div>
            <h2>Books where current user</h2>
            <div className='books'>
                {books.books.length === 0 && (
                    <p>0 books</p>
                )}
                {books.booksWhere.map((book) => {
                    return (
                        <div key={book.id} className='book'>
                            <p>author: {book.author}</p>
                            <p>title: {book.title}</p>
                            <p>isfav: {book.isFav.toString()}</p>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default Books;