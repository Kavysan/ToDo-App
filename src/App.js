import './App.css';
import { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function App() {
  const [isComplete, setIsComplete] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle,  setNewTitle] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
    setNewTitle("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    setTodos(reducedTodo)
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
  }

  const handleCompleteDeleteTodo = (index) => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index,1);
    setCompletedTodos(reducedCompletedTodo)
    localStorage.setItem('completedTodo',JSON.stringify(reducedCompletedTodo))
  }

  const handleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = mm + '/' + dd + '/' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);

    handleDeleteTodo(index);
    localStorage.setItem('completedTodo',JSON.stringify(updatedCompletedArr));

   }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savecompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
    localStorage.getItem('completedTodo')
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savecompletedTodo){
      setCompletedTodos(savecompletedTodo)
    }
    


  },[])

  return (
    <>
    <div className="App">
      <div className="todo-wrapper">
        <p className='underline-text'>MY TO DO LIST</p>
          <div className="todo-input">
              <div className='todo-input-item'>
                  <label>Task</label>
                  <input 
                      value={newTitle} 
                      onChange ={(e) => setNewTitle(e.target.value)} 
                      type="text" 
                      placeholder='Enter you task here'/>
              </div>


              <div className='todo-input-item' id="btn1">
                  <button 
                      type='button' 
                      className='primaryBtn'
                      onClick={handleAddTodo}>Add</button> 
              </div>
          </div>
          
          <div className="btn-area">
                <button className={`sec-button ${isComplete ===false && 'active'}`} 
                        onClick={()=> setIsComplete(false)} 
                        id="todo-btn">
                          Todo
                </button>
                <button className={`sec-button ${isComplete ===true && 'active'}`} 
                        onClick={()=> setIsComplete(true)} 
                        id="completed-btn">
                          Completed
                </button>
          </div>
          
          
          <div className="todo-list">
            {isComplete === false && allTodos.map((item,index) => (
                <div className='todo-list-item' key = {index}>
                  <div>
                    <p>{item.title}</p>
                    {/* <p>{item.description}</p> */}
                  </div>
                
                  <div className='icons'>
                    <ImCross className='icon' 
                              onClick= {() => handleDeleteTodo(index)} 
                              title="Delete"/>
                    <FaCheck className='check-icon'
                              onClick={() => handleCompleteTodo(index)}
                              title = "Complete"/>
                  </div>
              </div>
              )
            )}

            {isComplete === true && completedTodos.map((item,index) => (
                <div className='todo-list-item' key = {index}>
                  <div>
                    <p id='completed-text'>{item.title}</p>
                    <p><small>Completed On: {item.completedOn}</small></p>
                  </div>
                
                  <div className='icons'>
                    <ImCross className='icon' 
                              onClick= {() => handleCompleteDeleteTodo(index)} 
                              title="Delete"/>
                  </div>
              </div>
              )
            )}
          </div>
          </div>
      </div></>

  );
}

export default App;
