
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [posts, setPosts] = useState([])
  const [credSource, setCredSource] = useState("");
  const [credMoney, setCredMoney] = useState("");
  const [debtSource, setDebtSource] = useState("");
  const [debtMoney, setDebtMoney] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/history')
      .then((response) => response.json())
      .then((data) => {

        if (data.status !== 500)
          setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])


  let totalIncome = 0;
  let totalExpense = 0;
  let currentBalance = 0;

  console.log(posts)
  if (posts.length !== 0) {
    totalIncome = posts.reduce((a, v) => (v.category === 'c') ? a + v.amount : a, 0);
    totalExpense = posts.reduce((a, v) => (v.category === 'd') ? a + v.amount : a, 0);
    currentBalance = totalIncome - totalExpense;
  }

  function addTransaction(name) {
    
    let source = "";
    let amount = "";
    let category = "";

    if (name === 'credit') {
      if (!credSource) {
        window.alert("Missing credit source value!");
      }
      if (!credMoney) {
        window.alert("Missing credit money!");
      }
      source = credSource;
      amount = credMoney;
      category = "c";
    } else {
      if (!debtSource) {
        window.alert("Missing debit source value!");
      }
      if (!debtMoney) {
        window.alert("Missing Debit money!");
      }
      source = debtSource;
      amount = debtMoney;
      category = "d"
    }

    const object = {
      "source": source,
      "amount": amount,
      "category": category
    }

    console.log(object)

    fetch('http://localhost:5000/addtransaction', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(object)
    }).then((result) => {
      setPosts([result, ...posts])
      console.log(result)
    }).catch((err) => {
      console.log(err.message);
    });
  }



  return (

    <div className='container'>

      <h2>Expense Tracker</h2>
      <div className='balance'>
        <h4>Your Current Balance</h4>
        <p>&#8377; {currentBalance.toFixed(2)}</p>
      </div>

      <div className='income-expense'>
        <div className='income'>
          <h4>INCOME</h4>
          <p>&#8377; {totalIncome.toFixed(2)}</p>
        </div>
        <div className='expense'>
          <h4>EXPENSE</h4>
          <p>&#8377; {totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <h3>Add Transactions</h3>
      <form className='form'>
        <div className='credited'>
          <input type="text" className='input' placeholder='add source' id="credsource" value={credSource} onChange={(e) => setCredSource(e.target.value)} />
          <input type="number" className='input' placeholder='add money' id="credmoney" value={credMoney} onChange={(e) => setCredMoney(e.target.value)} />
          <button type='submit' className='button' style={{ "background": "#00ac33" }} onClick={() => addTransaction("credit")}>
            Add Credit
          </button>
        </div>
        <div className='credited'>
          <input type="text" className='input' placeholder='add source' id="debtsource" value={debtSource} onChange={(e) => setDebtSource(e.target.value)} />
          <input type="number" className='input' placeholder='add money' id="debtmoney" value={debtMoney} onChange={(e) => setDebtMoney(e.target.value)} />
          <button type='submit' className='button' style={{ "background": "red" }} onClick={() => addTransaction("debt")} >Add Debit</button>
        </div>
      </form>
      <h3>History</h3>


      <div className='transaction-summary'>
        {(posts.length === 0) ? <h3>No History Found</h3> : posts.map(t => (
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
