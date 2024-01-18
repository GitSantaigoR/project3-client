import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";

const CreateBookPage = ({ onBookCreated }) => {
  const [newBook, setNewBook] = useState({
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

  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = newBook;

    post("/books", requestBody)
      .then(() => {
        navigate("/books");
        if (onBookCreated) {
            onBookCreated()
        }
        setNewBook({
            title: "",
            author: "",
            description: "",
            format: "",
            pages: "",
            genres: "",
            image: "",
            price: "",
            condition: "",
          })
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="CreateBookPage">
      <h3>Add Book</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInput}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInput}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={newBook.description}
          onChange={handleInput}
        />

        <label>Format:</label>
        <input
          type="text"
          name="format"
          value={newBook.format}
          onChange={handleInput}
        />

        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={newBook.pages}
          onChange={handleInput}
        />

        <label>Genres:</label>
        <input
          type="text"
          name="genres"
          value={newBook.genres}
          onChange={handleInput}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={newBook.image}
          onChange={handleInput}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={newBook.price}
          onChange={handleInput}
        />

        <label>Condition:</label>
        <input
          type="text"
          name="condition"
          value={newBook.condition}
          onChange={handleInput}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBookPage;

// title: { type: String, required: true },
// author: { type: String, required: true },
// description: { type: String },
// format: { type: String },
// pages: { type: Number
//     // , required: true 
// },
// genres: { type: String
//     // , required: true 
// },
// image: { type: String
//     // , required: true 
// },
// price: { type: Number
//     // , required: true 
// },
// condition: { type: String },