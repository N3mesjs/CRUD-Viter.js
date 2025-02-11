import './index.css'
import { useState, useEffect } from 'react';
import PopUp from './PopUp';

function App() {
  
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [userIds, setUserIds] = useState<{ id: number }[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000')
      .then(response => response.json())
      .then(data => setUserIds(data))
      .catch(error => console.error('Errore durante il recupero degli ID degli utenti:', error));
  }, []);

  const postMethod = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
    .then(response => {
      if (response.ok) {
        setShowPopUp(true);
        setTimeout(() => {
          setShowPopUp(false);
        }, 5000);
        setName('');
      }
    })
    .catch(error => console.error('Errore durante la creazione dell\'utente:', error));
  };

  const updateMethod = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (id !== 'null') {
      fetch('http://localhost:4000', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, id: id })
      })
      .then(response => {
        if (response.ok) {
          setShowPopUp(true);
          setTimeout(() => {
            setShowPopUp(false);
          }, 5000);
          setName('');
        }
      })
      .catch(error => console.error('Errore durante l\'aggiornamento dell\'utente:', error));
    }
  };

  const deleteMethod = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (id !== 'null') {
      fetch('http://localhost:4000', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      })
      .then(response => {
        if (response.ok) {
          setShowPopUp(true);
          setTimeout(() => {
            setShowPopUp(false);
          }, 5000);
        }
      })
      .catch(error => console.error('Errore durante l\'eliminazione dell\'utente:', error));
    }
  };

  return (
    <>
      {showPopUp ? <PopUp /> : ""}
      <div className="absolute left-[50%] top-[2em] -translate-x-[50%]">
        <form className='p-[3em] rounded-3xl mt-[7em] bg-[#3300ac] flex flex-col items-center'>
          <h1 className='text-[20px] font-bold'>POST</h1>
          <input className="border-[1px] rounded-2xl p-[1em] bg-white text-black mb-3" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className='px-[15px] py-[7px] bg-black rounded-2xl' onClick={postMethod}>Invia</button>
        </form>

        <form className='p-[3em] rounded-3xl bg-[#3300ac] flex flex-col items-center mt-[4em]'>
          <h1 className='text-[20px] font-bold'>Update</h1>
          <input className="border-[1px] rounded-2xl p-[1em] bg-white text-black mb-3" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          <select className='text-black bg-white p-[1em] rounded-2xl mb-3' value={id} onChange={(e) => setId(e.target.value)}>
            <option value="null">Seleziona un id</option>
            {userIds.map((user, i) => (
              <option key={i} value={user.id}>{user.id}</option>
            ))}
          </select>
          <button type="submit" className='px-[15px] py-[7px] bg-black rounded-2xl' onClick={updateMethod}>Invia</button>
        </form>

        <form className='p-[3em] rounded-3xl bg-[#3300ac] flex flex-col items-center mt-[4em]'>
          <h1 className='text-[20px] font-bold'>Delete</h1>
          <select className='text-black bg-white p-[1em] rounded-2xl mb-3' value={id} onChange={(e) => setId(e.target.value)}>
            <option value="null">Seleziona un id</option>
            {userIds.map((user, i) => (
              <option key={i} value={user.id}>{user.id}</option>
            ))}
          </select>
          <button type="submit" className='px-[15px] py-[7px] bg-black rounded-2xl' onClick={deleteMethod}>Elimina</button>
        </form>
      </div>
    </>
  );
}

export default App;