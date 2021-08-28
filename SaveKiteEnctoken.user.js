// ==UserScript==
// @name         SaveKiteEnctoken
// @namespace    https://github.com/TechfaneTechnologies/SaveKiteEnctoken
// @version      0.0.1
// @description  The Script Save KiteEnctoken to jsonbin.com, which can be used to synchronized enctoken between local browser and Algo Trading Code at Remote Server
// @author       Quantitative Algo Trading https://t.me/quantalgotradings
// @match        https://kite.zerodha.com/*
// @icon         https://www.google.com/s2/favicons?domain=zerodha.com
// @grant        none
// @downloadURL  https://github.com/TechfaneTechnologies/SaveKiteEnctoken/SaveKiteEnctoken.user.js
// @updateURL    https://github.com/TechfaneTechnologies/SaveKiteEnctoken/SaveKiteEnctoken.meta.js
// ==/UserScript==

(function() {
    'use strict';
    const YOUR_API_KEY = "$2b$10$X.hXiOt6nYXumjrocr4qTOQHqjYzbqTlZ9un6Jczsp5wDjE3JcAv6" // Update YOUR_API_KEY Master API KEY Obtained from jsonbin.com
    const BIN_ID = "6129ad7c2aa8003612711a03" // update the bin id

    const REQUEST_URL = "https://api.jsonbin.io/v3/b/"+BIN_ID+"/latest"
    var current_enctoken = window.document.cookie.split('; ').slice(-1)[0].split('enctoken=').slice(-1)[0]

    function UpdateEnctoken(new_enctoken) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                console.log(req.responseText);
            }
        };
        req.open("PUT", "https://api.jsonbin.io/v3/b/"+BIN_ID, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", YOUR_API_KEY);
        req.send('{"enctoken": "'+new_enctoken+'"}');
    }

    function CheckEnctoken() {
        let req = new XMLHttpRequest();
        let url = '';
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                var jsonResponse = JSON.parse(req.responseText);
                var saved_enctoken = jsonResponse.record.enctoken;
                if (saved_enctoken !== current_enctoken) {
                    UpdateEnctoken(current_enctoken);
                    console.info("Enctoken Has Changed And Updated On The Server");
                }
                else {
                    console.warn("Enctoken Has Not Changed, Hence Not Updated On The Server!");
                }
            }
        };
        req.open("GET", url.concat("https://api.jsonbin.io/v3/b/", BIN_ID, "/latest"), true);
        req.setRequestHeader("X-Master-Key", YOUR_API_KEY);
        req.send();
    }

    CheckEnctoken();

})();
