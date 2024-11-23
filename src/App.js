import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('BYN');
  const [fromPrice, setFromPrice] = React.useState(1); // Установлено значение 1 евро по умолчанию
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((response) => response.json())
      .then((data) => {
        setRates(data.Valute);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить инфу');
      });
  }, []);

  React.useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const price = fromPrice * rates[fromCurrency].Value;
      const result = price / rates[toCurrency].Value;
      setToPrice(result);
    }
  }, [fromCurrency, toCurrency, fromPrice, rates]);

  const onChangeFromPrice = (value) => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const price = value * rates[fromCurrency].Value;
      const result = price / rates[toCurrency].Value;
      setToPrice(result);
    }
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const price = value * rates[toCurrency].Value;
      const result = price / rates[fromCurrency].Value;
      setFromPrice(result);
    }
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
