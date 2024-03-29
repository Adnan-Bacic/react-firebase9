import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import useUser from '../hooks/useUser'
import { db } from '../firebase/config';
import './books.css'

const AddBook = () => {
    const [values, setValues] = useState({
        title: '',
        author: ''
    })

    const user = useUser()

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user.authUser === null){
            return
        }
        
        const colRef = collection(db, 'books')

        await addDoc(colRef, {
            title: values.title,
            author: values.author,
            isFav: false,
            userUid: user.authUser.uid
        })
    }

    if (user.authUser === null){
        return(
            <p>you must be logged in to create books</p>
        )
    }

    return (
        <div className='container-add-book'>
            <form onSubmit={handleSubmit}>
                <h3>Add a New Book</h3>

                <label htmlFor="title">Book title:</label>
                <input type="text" name="title" id='title' onChange={handleInputChange} required />

                <label htmlFor="author">Book author:</label>
                <input type="text" name="author" id='author' onChange={handleInputChange} required />
                <button>Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;