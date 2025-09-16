import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteAll, deleteOne, updateTodo } from "./store/todoSlice/todoSlice";

const App = () => {
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  const handleAddOrUpdate = () => {
    if (input.trim() === "") return;
    if (editingIndex !== null) {
      dispatch(updateTodo({ index: editingIndex, newText: input }));
      setEditingIndex(null);
    } else {
      dispatch(addTodo(input));
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setInput(todos[index]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex justify-center items-start p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Todo App
        </h1>

        {/* Input + Add/Update */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a todo..."
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddOrUpdate}
            className={`${
              editingIndex !== null ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"
            } text-white px-4 py-2 rounded-lg transition`}
          >
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Delete All */}
        <button
          onClick={() => dispatch(deleteAll())}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-4 transition"
        >
          Delete All
        </button>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">{todo}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(deleteOne(index))}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
