import API from "../services/api";
import { Book } from "../types/Book";

interface Props {
    book: Book;
    onClose: () => void;
    onDeleted: () => void;
}

const DeleteModal = ({ book, onClose, onDeleted }: Props) => {
    const confirmDelete = async () => {
        try {
            await API.delete(`/books/${book.id}`);
            onDeleted();
        } catch (error) {
            alert("Failed to delete the book. Please try again.");
        }
    }
    return (
        <div className="modal-overlay open" onClick={onClose}>
            <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-spine" style={{ background: "var(--rust)" }}></div>
                <button className="close-btn" onClick={onClose}>X</button>
                <div className="delete-icon">🗑</div>
                <h2 className="modal-title">Delete Book?</h2>
                <p className="modal-sub">
                    "{book.title}" will be permanently deleted. Are you sure you want to proceed?
                </p>

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" style={{ background: "var(--rust)", color: "white" }} onClick={confirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;