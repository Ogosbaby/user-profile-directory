import { useState } from 'react';
import App from "../App.jsx";

const UserCard = ({ user, darkMode }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`${
        darkMode
          ? 'bg-black border border-white text-white'
          : 'bg-white text-black'
      } rounded-lg shadow-md p-5 hover:shadow-lg`}>
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>City:</strong> {user.address.city}</p>
      {showDetails && (
        <div className="mt-3 text-sm text-gray-600">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`${
        darkMode
          ? 'bg-white border hover:bg-gray-200 text-black'
          : 'bg-amber-950 hover:bg-amber-900 text-white'
      } mt-4   p-3 rounded-2xl transition duration-300`}
      >
        {showDetails ? 'Hide Details' : 'View More'}
      </button>


    </div>
  );
};

export default UserCard;
