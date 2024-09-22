import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";



function App() {
  const [task, settask] = useState('');
  const [tasks, settasks] = useState([]);
  const [showfinished, setshowfinished] = useState(false);

  useEffect(() => {
    const taskstring = localStorage.getItem('tasks');
    if (taskstring) {
      const savedTasks = JSON.parse(taskstring);
      settasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    // Delay localStorage update to ensure state is up-to-date
    const timeout = setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, [tasks]);

  const togglefinished = () => {
    setshowfinished(!showfinished);
  };

  const handleAdd = () => {
    if (task.trim() === '') return; // Prevent adding empty tasks
    settasks(prevTasks => [
      ...prevTasks,
      { id: uuidv4(), task, iscompleted: false }
    ]);
    settask('');
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(i => i.id === id);
    if (taskToEdit) settask(taskToEdit.task);
    const newTasks = tasks.filter(item => item.id !== id);
    settasks(newTasks);
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter(item => item.id !== id);
    settasks(newTasks);
  };

  const handleChange = (e) => {
    settask(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTasks = tasks.map(item =>
      item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
    );
    settasks(updatedTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.length>2) {
      handleAdd();
    }
  };

  // Filter tasks based on showfinished state
  const filteredTasks = showfinished ? tasks : tasks.filter(item => !item.iscompleted);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 w-[90%] bg-[rgb(18,18,18)] text-white rounded-xl p-5 h-[80vh]">
        <div className="addtask text-lg font-bold">
          <h1 className='text-2xl'>Add a task</h1>
          <div className="flex items-center mt-5 justify-between w-full">
            <div className='w-full'>
              <input
                className='rounded-xl p-1 text-black font-normal w-[70%]'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={task}
                type="text"
              />
              <button
                onClick={handleAdd}
                disabled={task.length < 3}
                className='disabled:hover:font-normal font-normal text-sm ml-3 px-3 py-2 bg-white text-black rounded-xl hover:font-bold w-14 transition-all duration-[2000]'
              >
                Save
              </button>
            </div>
            <div className="showcomplete w-full flex justify-center items-center">
              <span className='text-lg mr-2'>Show finished</span>
              <input onChange={togglefinished} type="checkbox" checked={showfinished} />
            </div>
          </div>
        </div>
        <h1 className='text-xl font-bold mt-5'>Your Tasks</h1>
        <div className="tasks my-2 h-[70%] overflow-x-auto mb-5">
          {filteredTasks.length === 0 ? (
            <div className='text-lg font-bold flex h-full w-full justify-center items-center'>
              No Tasks to do, Add tasks
            </div>
          ) : (
            filteredTasks.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className={item.iscompleted ? 'line-through' : ''}>
                  {item.task}
                </div>
                <div className="buttons flex">
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.iscompleted}
                    className='mr-2'
                  />
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='flex justify-center items-center font-normal text-sm mx-2 my-2 px-3 py-1 bg-white text-black rounded-xl hover:font-bold w-20 transition-all duration-[2000]'
                  >
                    <MdEditNote className='text-2xl' /><div className="btntext"> Edit</div>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='flex justify-center items-center font-normal text-sm mx-2 my-2 px-3 py-1 bg-white text-black rounded-xl hover:font-bold w-24 transition-all duration-[2000]'
                  >
                    <MdDelete className='text-2xl' /><div className="btntext"> Delete</div>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
