import { useState, useEffect } from 'react';
import { RateTable } from './RateTable';
import { CurrencyCodePicker } from './CurrencyCodePicker';
import { AmountField } from './AmountField';
import { getExchangeRates } from '../api';
import { useSelector } from 'react-redux';
import { getAmount, getCurrencyCode } from '../store/rates';

const supportedCurrencies = ['USD', 'EUR', 'JPY', 'CAD', 'GBP', 'MXN'];

export function ExchangeRate() {
  const amount = useSelector(getAmount);
  const currencyCode = useSelector(getCurrencyCode);
  const [currencyData, setCurrencyData] = useState({ USD: 1.0 });

  // fetch the exchange rates each time currency code changes
  useEffect(() => {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      setCurrencyData(rates);
    });
  }, [currencyCode]);

  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates{' '}
          <CurrencyCodePicker
            supportedCurrencies={supportedCurrencies}
            currencyCode={currencyCode}
          />
        </h1>
      </section>
      <section>
        <AmountField amount={amount} />
      </section>
      <section>
        <RateTable currencyData={currencyData} amount={amount} />
      </section>
    </>
  );
}
