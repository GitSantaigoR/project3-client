import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import CreateBookPage from "./CreateBookPage"; 
import { AuthContext } from "../context/auth.context";


const BookListPage = () => {
  const [books, setBooks] = useState([]);

  const { user } = useContext(AuthContext)

  const fetchBooks = () => {
    get("/books")
      .then((response) => {
        console.log("Found books", response.data);
        setBooks(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookCreated = () => {
    fetchBooks();
  };

  const handleDeleteBook = (bookId) => {
    remove(`/books/${bookId}`)
      .then(() => {
        console.log("Book deleted successfully");
        fetchBooks();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="BookListPage">
      <h3>Book List</h3>
      

      <ul>
        {books.length > 0 &&
          books.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>
                {book.title} by {book.author}
              </Link>

            </li>
          ))}
      </ul>

      {/* Render CreateBookPage and pass the callback function */}

      {
        user &&
       <CreateBookPage onBookCreated={handleBookCreated} />
      }
    </div>
  );
};

export default BookListPage;