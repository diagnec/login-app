import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try{
            const respinse = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });

            setMessage(response.data.message);  
        } catch (error) {
            setMessage('Erreur serveur');
        }
    };
     
    return (
        <div className="container"> 
           <div className="card">
              <h1>Bienvenue chez Vous</h1> 

              <input
                 type="text"
                 placeholder="Username"
                 onChange={(e) => setUsername(e.target.value)}
              /> 

               <input
                 type="text"
                 placeholder="password"
                 onChange={(e) => setPassword(e.target.value)}
              /> 

              <button onClick={handleLogin}>Login</button>
            
              <p>{message}</p>
            </div>
        </div>
          
    );
}

export default App;
