import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [rates, setRates] = useState([])
  // https://api.currencyfreaks.com/v2.0/rates/latest?apikey=64d4ca524760478fb1ce6316388a3e6f&symbols=CAD,EUR,IDR,JPY,CHF,GBP
  useEffect(() => {
    axios.get("https://api.currencyfreaks.com/v2.0/rates/latest", {
      params: {
        'apikey' : '64d4ca524760478fb1ce6316388a3e6f',
        'symbols' : 'CAD,EUR,IDR,JPY,CHF,GBP'
      }
    })
    .then(res => {
      console.log(res.data.rates)
      setRates(res.data.rates)
    })
  }, [])

  return (
    <div className="container">
      <div className="box">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.entries(rates).map(([cur,excrate], index) => (
              <tr key={index}>
                <td>{cur}</td>
                <td>{parseFloat(excrate) + parseFloat((excrate * 0.05))}</td>
                <td>{excrate}</td>
                <td>{parseFloat(excrate) - parseFloat((excrate * 0.05))}</td>
              </tr>
            ))
          }
          
          </tbody>
        </table>
        <div className="copyright">
          <p>Rate are based from 1 USD</p>
          <p>This application uses API from https://currencyfreaks.com</p>
        </div>
      
      </div>
    </div>
  );
}

export default App;
