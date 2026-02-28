import { useEffect, useState } from "react"
import { Book } from "../types/Book"
import API from "../services/api";
import exp from "constants";
import { Link } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        const response = await API.get("/books");
        setBooks(response.data);
    }

    const deleteBook = async (id: number) => {
        await API.delete(`/books/${id}`);
        fetchBooks();
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Library Books</h2>
            <Link to="/create">Add New Book</Link>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>
                                <Link to={`/edit/${book.id}`}>Edit</Link>
                                <button onClick={() => deleteBook(book.id!)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList;