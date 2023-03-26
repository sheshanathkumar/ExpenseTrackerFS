
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [posts, setPosts] = useState([])
  // const [trData, setTrData] = useState([])
  useEffect( () => {
    fetch('http://localhost:5000/history')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(posts)


  let totalIncome = 0;
  let totalExpense = 0;
  let currentBalance = 0;

  if (posts.length !== 0 ) {
    console.log(posts.length)
    totalIncome = posts.reduce((a, v) => (v.category === 'c') ? a + v.amount : a, 0);
    totalExpense = posts.reduce((a, v) => (v.category === 'd') ? a + v.amount : a, 0);
    currentBalance = totalIncome - totalExpense;
    console.log(totalExpense, totalIncome, currentBalance)
  }

  return (
    <div className='container'>
      <h2>Expense Tracker</h2>
      <div className='balance'>
        <h4>Your Current Balance</h4>
        <p>&#8377; {currentBalance}</p>
      </div>

      <div className='income-expense'>
        <div className='income'>
          <h4>INCOME</h4>
          <p>&#8377; {totalIncome}</p>
        </div>
        <div className='expense'>
          <h4>EXPENSE</h4>
          <p>&#8377; {totalExpense}</p>
        </div>
      </div>

      <h3>Add Transactions</h3>
      <form className='form'>
        <div className='credited'>
          <input type="text" className='input' placeholder='add source' id="credsource" />
          <input type="number" className='input' placeholder='add money' id="credmoney" />
          <button type='submit' className='button' style={{ "background": "#00ac33" }} >
            Add Credit
          </button>
        </div>
        <div className='credited'>
          <input type="text" className='input' placeholder='add source' id="debtsource" />
          <input type="number" className='input' placeholder='add money' id="debtmoney" />
          <button type='submit' className='button' style={{ "background": "red" }} >Add Debit</button>
        </div>
      </form>
      <h3>History</h3>


      <div className='transaction-summary'>
        {  ( posts.length === 0 ) ? <h3>No History Found</h3> :   posts.map(t => (
          <ul key={t.id}>
          
          <div className='transaction'>
            <p>{t.source}</p>
            <p>&#8377; {t.amount}</p>
            <p style={t.category === 'c' ? { "background": "#00ac33" } : { "background": "red" }}></p>
          </div>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
