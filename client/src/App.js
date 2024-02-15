import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const data = {
      name,
      email,
      date,
      numberOfPlayers: count,
    };
    console.log('Data:', data);
    try {
      const response = await fetch('ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle response here
        console.log('Success:', data);
      } else {
        // Handle errors here
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
    
      <div className='background'>
      <h1>Tennis Booking App</h1>
      <div>
        <a href="" target="_blank">
          <img src="https://static.vecteezy.com/system/resources/previews/027/504/381/original/a-tennis-ball-on-a-transparent-background-free-png.png" className="logo" alt="Vite logo" />
        </a>
      
      </div>
      <form onSubmit={handleSubmit}>
      <div className='userInfo'>
        Enter your name: <input type="text" />
      </div>
      <div className='userInfo'>
        Enter your email: <input type="email"/>
      </div>
      <div className='userInfo'>
        Enter your date: <input type="date" />
      </div>
      <div className="card">
        Number of players: {count}
        <button onClick={() => setCount((count) => count + 1)}>
          +
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        <p>
          Testing Tennis Booking App
        </p>
        <div><button type="submit">Submit Booking</button></div>
      </div>
      </form>
      </div>
      
    </>
  )
}

export default App

