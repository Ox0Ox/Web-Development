import { useEffect, useReducer, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  // Define the API endpoint
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';
  
  // Initialize state
  const [todos, settodos] = useState([]); // Start with an empty array

  // Fetch data from the API inside useEffect to update state
  useEffect(() => {
    fetch(apiURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        settodos(data); // Update state with fetched data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  const [count, setCount] = useState(0);
  const [color, setcolor] = useState(0);
  const a = useRef(0);
  const btnref = useRef();
  const [showbtn, setshowbtn] = useState(false);
  const [form, setform] = useState({})

  const handlechange = (e) =>{
    setform({...form, [e.target.name]:e.target.value})
    console.log(form)
  }

  useEffect(() => {
    alert("welcome to trial");
  }, []);

  useEffect(() => {
    alert("Count has been changed");
    setcolor(color + 1);
    a.current = a.current + 1;
    console.log(a.current);
    btnref.current.style.backgroundColor = 'red';
  }, [count]);

  return (
    <>
      <Navbar color={"white" + color}/>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {todos.map(todo => (
        <div key={todo.id} className="m-4 border border-purple-600">
          <div className="todo">{todo.title}</div>
          <div className="todo">{todo.body}</div>
        </div>
      ))}
      <div className="card">
        <button ref={btnref} onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        {showbtn ? <button>You can see button</button> : "You can't see button L"}
        <button onClick={() => setshowbtn(!showbtn)}>
          Button Toggle
        </button>
      </div>
      <input className='mr-5' type="text" name = 'email' value = {form.email?form.email:''} onChange={handlechange} />
      <input type="text" name = 'phone' value = {form.phone?form.phone:''} onChange={handlechange} />
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
