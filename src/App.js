import { useState, useEffect} from 'react';
import './App.css';
import SocialCard from './SocialCard.js';

function App() {

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch('https://randomuser.me/api/?results=20');
        userData = (await response.json()).results;
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData);
      setUsers(userData);
    })();
  }, []);
  
  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(
      user => (`${user.name.title} ${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(value)
      )
    );
    setUsers(filteredUsers);
  };

  

  return (
    <div className="App">
      <h1>Social Cards</h1>
      <input className="search-box" placeholder="Search..." onInput={filterCards}></input>
      <div className="card-container">
        {users.map((user, index) => (
          <SocialCard userData={user} key={index}/>
      ))}
      </div>
    </div>
  );
}

export default App;
