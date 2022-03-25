// FETCH DATA USING API USING WEBSOCKET 
let ws = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let stockPriceElement = document.getElementById('stock-price')
let lastPrice = null;

let count = 1;
ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(3);
    stockPriceElement.innerText = price;
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
    lastPrice = price;
    let d = Date();
    myChart.data.labels.push(d.slice(16, 24));
    myChart.data.datasets[0].data.push(lastPrice)
    myChart.update();
   

    // STORE DATA INTO TABLE 
    let temp = document.createElement("tr");
    temp.innerHTML = `<td>${count++}</td><td> ${stockObject.p} </td> <td> ${d.slice(16, 24)} </td>`;
    document.getElementById('data1').appendChild(temp);

}

// SHOW DATA CHART
const ctx = document.getElementById('canvas').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Price Of ETH',
            data: [],
            backgroundColor: 'transparent',
            borderColor: 'Red',
            borderWidth: 4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



