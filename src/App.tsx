import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<BookList />} /> */}
        <Route path="/create" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
