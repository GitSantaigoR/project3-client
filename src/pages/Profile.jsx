import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./Profile.css"


const Profile = () => {
  const { user, authenticateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authenticateUser();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (!user) {
      fetchData();
    }

    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found. Redirect to login...</div>;
  }

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <img src={user.photo} alt="Profile" />

      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {user.lastName}
      </div>
      <div>
        <strong>Address:</strong> {user.streetAddress}, {user.city},{" "}
        {user.state}, {user.zip}
      </div>

      {/* Display Books Listed by the User */}
      <h3>Books Listed</h3>
      <ul>
        {user.booksListed && user.booksListed.length > 0 ? (
          user.booksListed.map((book) => <li key={book._id}>{book.title}</li>)
        ) : (
          <li>No books listed</li>
        )}
      </ul>

      {/* Display Books Sold by the User */}
      <h3>Books Sold</h3>
      <ul>
        {user.booksSold && user.booksSold.length > 0 ? (
          user.booksSold.map((book) => <li key={book._id}>{book.title}</li>)
        ) : (
          <li>No books sold</li>
        )}
      </ul>

      {/* Display Sold Transactions */}
      <h3>Sold Transactions</h3>
      <ul>
        {user.soldTransactions && user.soldTransactions.length > 0 ? (
          user.soldTransactions.map((transaction) => (
            <li key={transaction._id}>{/* Display transaction details */}</li>
          ))
        ) : (
          <li>No sold transactions</li>
        )}
      </ul>
    </div>
  );
};

export default Profile;
