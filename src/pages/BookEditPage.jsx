import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, put, axiosDelete } from "../services/authService";

const BookEditPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    format: "",
    pages: "",
    genres: "",
    image: "",
    price: "",
    condition: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await get(`/books/${bookId}`);
        console.log("Found book", response.data);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleInput = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = book;

    put(`/books/${bookId}`, requestBody)
      .then(() => {
        navigate(`/books/${bookId}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axiosDelete(`/books/${bookId}`)
      .then(() => {
        navigate("/books");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="BookEditPage">
      <h3>Edit Book</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleInput}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleInput}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={book.description}
          onChange={handleInput}
        />

        <label>Format:</label>
        <input
          type="text"
          name="format"
          value={book.format}
          onChange={handleInput}
        />

        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={book.pages}
          onChange={handleInput}
        />

        <label>Genres:</label>
        <input
          type="text"
          name="genres"
          value={book.genres}
          onChange={handleInput}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={book.image}
          onChange={handleInput}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleInput}
        />

        <label>Condition:</label>
        <input
          type="text"
          name="condition"
          value={book.condition}
          onChange={handleInput}
        />

        <button type="submit">Update</button>
      </form>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BookEditPage;