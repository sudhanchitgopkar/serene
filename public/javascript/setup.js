jsonData = null;
let usr = new User([],[]);
(async ($) => {
    // Grab a Link token to initialize Link
    const createLinkToken = async () => {
      const res = await fetch("/api/create_link_token");
      const data = await res.json();
      const linkToken = data.link_token;
      localStorage.setItem("link_token", linkToken);
      return linkToken;
    };

    // Initialize Link
    const handler = Plaid.create({
      token: await createLinkToken(),
      onSuccess: async (publicToken, metadata) => {
        await fetch("/api/exchange_public_token", {
          method: "POST",
          body: JSON.stringify({ public_token: publicToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await getBalance();
      },
      onEvent: (eventName, metadata) => {
        console.log("Event:", eventName);
        console.log("Metadata:", metadata);
      },
      onExit: (error, metadata) => {
        console.log(error, metadata);
      },
    });

    // Start Link when button is clicked
    const linkAccountButton = document.getElementById("link-account");
    linkAccountButton.addEventListener("click", (event) => {
      handler.open();
    });
  })(jQuery);

  // Retrieves balance information
  const getBalance = async function () {
    const response = await fetch("/api/data", {
      method: "GET",
    });
    const data = await response.json();
    //console.log(data);

    jsonData = data
    analyze();
    //Render response data
    const pre = document.getElementById("response");
    pre.textContent = JSON.stringify(data, null, 2);
    pre.style.background = "#F6F6F6";
  };

  // Check whether account is connected
  const getStatus = async function () {
    const account = await fetch("/api/is_account_connected");
    const connected = await account.json();
    if (connected.status == true) {
      getBalance();
    }
  };
  getStatus();



  function analyze() {
    const holdings = jsonData["Balance"]["holdings"];
    const securities = jsonData["Balance"]["securities"];
    for (var holding in holdings) {
      const id = holdings[holding]["security_id"];
      const qty = holdings[holding]["quantity"];
      var ticker;
      var type;

      for (var security in securities) {
        if (id == securities[security]["security_id"]) {
          ticker = securities[security]["ticker_symbol"];
          type = securities[security]["type"];
        } //if
      } //for

      const currSecurity = new Security(ticker, qty, type);
      if (currSecurity.ticker != null && currSecurity.price != undefined) {
        usr.addHolding(currSecurity);
      } // if
    } //holdings

    console.log(usr.getHoldings()); // debug
    console.log(usr.getOverlyVolatileHoldings()); // debug
    populateBalances();
    //console.log(usr.getAccounts()); // debug
    //console.log("IS THIS WORKING") // debug
    //console.log(jsonData); // debug
  }
  
  function populateBalances() {
    const accounts = jsonData["Balance"]["accounts"];
    for (var account in accounts) {
      usr.addAccount(new Account(accounts[account]["balances"]["current"], accounts[account]["name"]));
    } //for
  } //populateBalances
