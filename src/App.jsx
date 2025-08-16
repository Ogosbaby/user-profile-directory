import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCity) {
      filtered = filtered.filter((user) => user.address.city === filterCity);
    }

    if (filterCompany) {
      filtered = filtered.filter((user) => user.company.name === filterCompany);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterCity, filterCompany, users]);

  const uniqueCities = [...new Set(users.map((user) => user.address.city))];
  const uniqueCompanies = [...new Set(users.map((user) => user.company.name))];

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      } min-h-screen p-6 transition-colors duration-300`}
    >
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold lg:text-center text-3xl'>Profile Directory</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`${
            darkMode ? "bg-white text-black " : "bg-amber-950 text-white"
          } px-4 py-2  rounded-lg`}
        >
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <input
          type='text'
          placeholder='Search by name or username'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 rounded border ${
            darkMode
              ? "bg-black text-white border-white placeholder-gray-400"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className={`p-2 rounded border ${
            darkMode
              ? "bg-black text-white border-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value=''>Filter by City</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className={`p-2 rounded border ${
            darkMode
              ? "bg-black text-white border-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value=''>Filter by Company</option>
          {uniqueCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className='text-center text-amber-500'>Loading Users...</p>
      )}
      {error && <p className='text-center text-red-500'>{error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
};

export default App;
