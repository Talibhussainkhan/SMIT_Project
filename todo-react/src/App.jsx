import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);

  const addTodo = () => {
    if (input === "") return;
    setTodo([...todo, input]);
    setInput("");
  };

  const deleteTodo = (idx) => {
    let updatedArr = [...todo];
    updatedArr.splice(idx, 1);
    setTodo(updatedArr);
  };

  const startEdit = (idx) => {
    setEdit(idx);
    setEditTodoInput(todo[idx]); 
  };

  const editTodo = (idx)=>{
    let updatedArr = [...todo];
    updatedArr[idx] = editTodoInput;
    setTodo(updatedArr);
    setEdit(null);
    setEditTodoInput('');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Todo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a todo..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todo.map((item, index) => (
            <li
              key={index}
              className=" bg-gray-50 px-4 py-2 rounded-xl shadow-sm max-w-full overflow-y-auto"
            >
              {edit === index ? (
                <div className="flex items-center justify-between gap-2">
                  <input
                  value={editTodoInput}
                  onChange={(e)=>setEditTodoInput(e.target.value)}
                    type="text"
                    className="border-1 px-2 border-gray-500 outline-none w-full"
                  />
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={()=>{ editTodo(index)}}
                  >
                    Edit
                  </button>
                  <button
                    onClick={()=>setEdit(null)}
                    className="px-3 py-1 text-sm bg-transparent text-black rounded-lg "
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium ">{item}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(index) }
                      className="px-3 py-1 text-sm whitespace-nowrap bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
