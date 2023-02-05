document.getElementById('riskAverseness').addEventListener('change', (e) => {
    myObject.volatilityThreshold = Math.pow(11 - e.target.value, 2);
    //console.log(myObject.volatilityThreshold); // debug
    var safest = getSafestHoldings(myObject.holdings, myObject.volatilityThreshold);
    var mostVolatile = getOverlyVolatileHoldings(myObject.holdings, myObject.volatilityThreshold);
    populateTables(safest, mostVolatile);
});

function populateTables(safest, mostVolatile) {
    clearTable();

    if (mostVolatile != null && mostVolatile != undefined) {
        /*
        for (mv in mostVolatile) {
            document.getElementById('hv' + i).innerHTML = mostVolatile[mv].ticker+ ': ' +  parseInt(parseFloat(mostVolatile[i]['volatility']) * 100);
            i++;
        } // for 
        */
        for (var i = 0; i < Object.keys(mostVolatile).length; i++) {
            document.getElementById('hv' + i).innerHTML = mostVolatile[i]['ticker'] + ': ' + parseInt(parseFloat(mostVolatile[i]['volatility']) * 100);
        } // for i
    } // if

    if (safest != null && safest != undefined) {
        for (var i = 0; i < Object.keys(safest).length; i++) {
            document.getElementById('lv' + i).innerHTML = safest[i]['ticker'] + ': ' + parseInt(parseFloat(safest[i]['volatility']) * 100);
        } // for i
    } // if

    if (mostVolatile == null || mostVolatile == undefined || Object.keys(mostVolatile).length == 0) {
        document.getElementById('hvadvice').innerHTML = 'No holdings are showing worrying amounts of volatility.';
        clearRow('hv');
        document.getElementById('lvadvice').innerHTML = 'These holdings are below your volatility threshold:';
    } else {
        document.getElementById('hvadvice').innerHTML = 'One or more holdings have a volatility which exceed your volatility threshold:';
        if (safest == null || safest == undefined || Object.keys(safest).length == 0) {
            document.getElementById('lvadvice').innerHTML = 'None of your holdings fall below your volatility threashold!';
            clearRow('lv');
        } else {
            document.getElementById('lvadvice').innerHTML = 'Consider weighting your portfolio more towards these holdings:';
        } // if
    } // if
} // populateTables()


// table: hv or lv
function clearRow(table) {
    for (var i = 0; i < 5; i++) {
        document.getElementById(table + i).innerHTML = '';
    } // for i
} // clear

//
function clearTable() {
    document.getElementById('hvadvice').innerHTML = '';
    document.getElementById('lvadvice').innerHTML = '';
    for (var i = 0; i < 5; i++) {
        document.getElementById('hv' + i).innerHTML = '';
        document.getElementById('lv' + i).innerHTML = '';
    } // for i
} // clearTable()

function getSafestHoldings(holdings, volatilityThreshold) {
    var safest = [];
    for (var holding in holdings) {
        const h = holdings[holding];
        //console.log(parseFloat(h.volatility) * 100); // debug
        //console.log(parseFloat(volatilityThreshold)); // debug
        if (h.volatility != -1 &&
            // * 10 since we want to compare as percents
            parseFloat(h.volatility) * 100 < parseFloat(volatilityThreshold)) {
            // safe stock found
            safest.push(h);
            //console.log("found less"); // debug
        } // if
    } // for holding
    console.log("safe"); // debug
    console.log(safest); // debug
    safest.sort(function(a, b) { return parseFloat(a.volatility) - parseFloat(b.volatility) });
    return safest;
} // getSafestHoldings()

// scans the user's holdings for items with volatility above the threshhold
// returns a list of the holdings that are deemed too volatile for the user
function getOverlyVolatileHoldings(holdings, volatilityThreshold) {
    var volatileHoldings = [];
    // iterate through holdings
    for (var holding in holdings) {
        const h = holdings[holding];
        //console.log(h); // debug
        //console.log("volatility: " + h.volatility); // debug
        if (h.volatility != -1 &&
            // * 10 since we want to compare as percents
            parseFloat(h.volatility) * 100 >= parseFloat(volatilityThreshold)) {
            // volatile stock found
            volatileHoldings.push(h);
        } // if
    } // for holding
    //console.log("volatile! " + volatileHoldings);
    volatileHoldings.sort(function(a, b) { return parseFloat(b.volatility) - parseFloat(a.volatility) });
    console.log(volatileHoldings); // debug
    return volatileHoldings;
} // getOverlyVolatileHoldings()