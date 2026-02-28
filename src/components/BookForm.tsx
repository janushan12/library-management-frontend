import React, { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const BookForm = () => {
    const [book, setBook] = useState<Book>({
        title: "",
        author: "",
        description: "",
    });

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            API.get(`/books/${id}`).then((res) => {
                setBook(res.data);
            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await API.put(`/books/${id}`, book);
        } else {
            await API.post("/books", book);
        }
        navigate("/");
    };

    return (
        <div>
            <h2>{id ? "Edit Book" : "Add New Book"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Book Title"
                    value={book.title}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="author"
                    placeholder="Enter Author Name"
                    value={book.author}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={book.description}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Save Book</button>
            </form>
        </div>
    );
}

export default BookForm;