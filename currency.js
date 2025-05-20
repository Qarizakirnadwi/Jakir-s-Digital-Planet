const apiKey = 'your_api_key_here'; // Replace with your API key
const apiURL = `https://api.exchangerate-api.com/v4/latest/USD`;  // You can use other APIs as well

// Fetch currency rates and populate the dropdowns
async function populateCurrencyOptions() {
    const response = await fetch(apiURL);
    const data = await response.json();
    
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    
    const currencies = Object.keys(data.rates);
    
    currencies.forEach(currency => {
        let optionFrom = document.createElement('option');
        optionFrom.textContent = currency;
        optionFrom.value = currency;
        fromCurrency.appendChild(optionFrom);
        
        let optionTo = document.createElement('option');
        optionTo.textContent = currency;
        optionTo.value = currency;
        toCurrency.appendChild(optionTo);
    });
}

// Convert currency on form submit
document.getElementById('converter-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('from-currency').value;
    let toCurrency = document.getElementById('to-currency').value;
    
    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }
    
    const response = await fetch(`${apiURL}?base=${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    
    const convertedAmount = (amount * rate).toFixed(2);
    
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
});

// Initial population of currency options
populateCurrencyOptions();
