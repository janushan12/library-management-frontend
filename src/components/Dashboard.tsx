import { useEffect, useState } from "react"
import "../Library.css"
import { Book } from "../types/Book"
import API from "../services/api";
import BookModal from "./BookModal";
import DeleteModal from "./DeleteModal";

const Dashboard = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await API.get("/books");
        setBooks(res.data);
    };

    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-title">Library</div>
                    <div className="logo-sub">Management System</div>
                </div>
            </aside>

            <main className="main">
                <header className="topbar">
                    <h1 className="topbar-heading">Book Collection</h1>
                    <div className="topbar-right">
                        <div className="search-bar">
                            <input type="text" placeholder="Search books by title" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={() => {
                            setEditingBook(null);
                            setShowModal(true);
                        }}>+ Add Book</button>
                    </div>
                </header>

                <div className="content">
                    <div className="stat-card">
                        <div className="stat-label">Total Books</div>
                        <div className="stat-value">{books.length}</div>
                    </div>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredBooks.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.description}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => {
                                                setEditingBook(book);
                                                setShowModal(true);
                                            }}
                                            >Edit</button>
                                            <button className="btn btn-secondary" onClick={() => {
                                                setBookToDelete(book);
                                                setShowDeleteModal(true);
                                            }}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredBooks.length === 0 && (
                            <div className="empty-state">
                                No books found. Try adjusting your search or add a new book.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {showModal && (
                <BookModal book={editingBook} onClose={() => setShowModal(false)} onSaved={() => {
                    setShowModal(false);
                    fetchBooks();
                }} />
            )}

            {showDeleteModal && bookToDelete && (
                <DeleteModal book={bookToDelete} onClose={() => setShowDeleteModal(false)} onDeleted={() => {
                    setShowDeleteModal(false);
                    setBookToDelete(null);
                    fetchBooks();
                }}
                />
            )}
        </>
    )



}

export default Dashboard;