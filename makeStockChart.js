    var myObject = JSON.parse(localStorage.getItem('exampleObject'));
    console.log(myObject);

    window.onload = function () {
        var dataPoints = [];

        var stockChart = new CanvasJS.StockChart("chartContainer", {
            animationEnabled: true,
            theme: "dark4",
            title: {
                text: "StockChart Title"
            },
            charts: [{
                data: [{
                    type: "line", //Change it to "spline", "area", "column"
                    dataPoints: dataPoints
                }]
            }],
            navigator: {
                slider: {
                    minimum: new Date(),
                    maximum: new Date()
                }
            }
        });

        $.getJSON("https://canvasjs.com/data/docs/btcusd2018.json", function (data) {
            var myObject = JSON.parse(localStorage.getItem('exampleObject'));
            const pHist = myObject["holdings"].at(id)["priceHistory"]["Time Series (Daily)"];
            for (var p in pHist) {
                console.log(p);
                console.log(pHist[p]["3. low"]);
                dataPoints.push({
                    x: new Date(p),
                    y: pHist[p]["3. low"] * 1000
                });
            }
            stockChart.render();
        });
    }