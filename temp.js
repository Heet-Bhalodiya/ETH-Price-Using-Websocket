// FETCH DATA USING API USING WEBSOCKET 
let ws = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let stockPriceElement = document.getElementById('stock-price')
let lastPrice = null;

var json1 = '';
var count = 0;
ws.onmessage = (event) => {
    // console.log(event.data);


    let stockObject = JSON.parse(event.data);

    if (count == 0) {
        json1 = '[' + event.data + ']';

        $(document).change(function () {
            $('#table1').DataTable({
                "data": JSON.parse(json1),
                "columns": [
                    { "data": "e" },
                    { "data": "E" },
                    { "data": "s" },
                    { "data": "t" },
                    { "data": "p" },
                    { "data": "q" },
                    { "data": "b" },
                    { "data": "a" },
                    { "data": "T" },
                    { "data": "m" },
                    { "data": "M" }
                ]
            });
        });
        count = count + 1;
    }
    else {
        var json2 = json1.slice(0, json1.length - 1) + ',' + event.data + ']';
        json1 = json2;
        // console.log(json1)
        console.log("i am in else loop")
        setTable();
    }

    function setTable() {

        console.log(json1)
        $(document).ready(function () {
            $('#table1').DataTable({
                responsive: true,
                destroy: true,
                "data": JSON.parse(json1),
                dom: 'lBfrtip',
                buttons: [
                    'excel', 'pdf', 'print', 'copy'
                ],
                "columns": [
                    { "data": "e" },
                    { "data": "E" },
                    { "data": "s" },
                    { "data": "t" },
                    { "data": "p" },
                    { "data": "q" },
                    { "data": "b" },
                    { "data": "a" },
                    { "data": "T" },
                    { "data": "m" },
                    { "data": "M" }
                ]
            });
        });

    }

    let price = parseFloat(stockObject.p).toFixed(3);
    stockPriceElement.innerText = price;
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
    lastPrice = price;
    let d = Date();

    // //   STORE DATA INTO TABLE 
    //   let temp = document.createElement("tr");
    //   temp.innerHTML = `<td>${count++}</td><td> ${stockObject.p} </td> <td> ${d.slice(16, 24)} </td>`;
    //   document.getElementById('data1').appendChild(temp);

}




// FOR CHART  let d = Date();
myChart.data.labels.push(d.slice(16, 24));
myChart.data.datasets[0].data.push(lastPrice)
myChart.update();

function chartopen() {

    const ctx = document.getElementById('canvas').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
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

}