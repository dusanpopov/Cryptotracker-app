import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import Coin from "./components/Coin";

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getCoins = () => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false")
    .then(response => {
      setCoins(response.data);
    },).catch(error => console.log(error))
  }

  useEffect(() => {
    getCoins();
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  let filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-container">
      <div className="coin-search">
        <h1 className="coin-text">
          Search for a currency
        </h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={searchHandler} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
