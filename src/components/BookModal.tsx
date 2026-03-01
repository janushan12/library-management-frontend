import { useState } from "react";
import { Book } from "../types/Book";
import API from "../services/api";


interface Props {
    book: Book | null;
    onClose: () => void;
    onSaved: () => void;
}

const BookModal = ({ book, onClose, onSaved }: Props) => {
    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(book?.author || "");
    const [description, setDescription] = useState(book?.description || "");

    const save = async () => {
        if (!title || !author) return;

        if (book) {
            await API.put(`/books/${book.id}`, {
                id: book.id,
                title,
                author,
                description
            });
        } else {
            await API.post("/books", {
                title,
                author,
                description
            });
        }
        onSaved();
    };

    return (
        <div className="modal-overlay open">
            <div className="modal">
                <h2>{book ? "Edit Book" : "Add New Book"}</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={save}>Save</button>
                </div>
            </div>
        </div>
    );
}


export default BookModal;