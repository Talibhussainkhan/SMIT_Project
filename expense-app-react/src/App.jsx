import { useEffect, useState } from "react";
import Card from "./components/Card";
import Table from "./components/Table";

const App = () => {

  const [ expense, setExpense] = useState({
    amount : '',
    transactions : ''   
  });
  const [value, setValue] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)

  const handleSubmit = ()=>{
    if(expense.amount === '' || expense.transactions === ''){
      alert('Mising details');
      return
    }
    setValue([...value, expense]);
    setExpense({
    amount : '',
    transactions : ''   
     });
  }

   useEffect(() => {
    const totalIncome = value.reduce((acc, item) => {
      return item.transactions === 'income' ? acc += Number(item.amount) : acc
    },0);
    setTotalIncome(totalIncome)
    
    const totalExpense = value.reduce((acc, item) => {
      return item.transactions === 'expense' ? acc += Number(item.amount) : acc
    },0);
    setTotalExpense(totalExpense)
    
    const balance = totalIncome - totalExpense;
    setTotalAmount(balance)
  }, [value]);  

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="py-4 px-3 max-w-5xl mx-auto ">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Expense App
        </h1>
        <hr className="my-2 text-gray-400" />
        <hr className="my-2 text-gray-400" />

        {/* cards */}
        <div className="flex gap-3 flex-wrap">
          <Card value={totalAmount} type='Balance' />
          <Card value={totalIncome} type='Income' />
          <Card value={totalExpense} type='Expense' />
        </div>
          {/* form */}
        <div className="mt-5 w-full max-w-lg mx-auto bg-white p-2 rounded">
          <div>
            <label
              for="base-input"
              className="block  text-lg ml-2 font-medium text-gray-900"
            >
              Amount
            </label>
            <input
              type="number"
              value={expense.amount}
              onChange={(e)=> setExpense({ ...expense, amount:e.target.value })}
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full outline-none block  p-2.5"
            />
          </div>
          <div className="mt-2">
            <label
              for="countries"
              className="b-2 text-lg ml-2 font-medium text-gray-900"
            >
              Transactions
            </label>
            <select
            value={expense.transactions}
              onChange={(e)=> setExpense({ ...expense, transactions:e.target.value })}
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value=''>Select your Transactions</option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
        <button onClick={handleSubmit} type="button" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center w-full mt-3">Base</button>
        </div>

        <Table value={value} />
      
      
      </div>
    </div>
  );
};

export default App;
