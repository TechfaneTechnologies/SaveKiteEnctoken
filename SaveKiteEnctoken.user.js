// ==UserScript==
// @name         SaveKiteEnctoken
// @namespace    https://github.com/TechfaneTechnologies/SaveKiteEnctoken
// @version      0.0.1
// @description  The Script Save KiteEnctoken to jsonbin.com, which can be used to synchronized enctoken between local browser and Algo Trading Code at Remote Server
// @author       Quantitative Algo Trading https://t.me/quantalgotradings
// @match        https://kite.zerodha.com/*
// @icon         https://www.google.com/s2/favicons?domain=zerodha.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require      https://raw.githubusercontent.com/TechfaneTechnologies/SaveKiteEnctoken/main/betterCommon.js
// @require      https://raw.githubusercontent.com/TechfaneTechnologies/SaveKiteEnctoken/main/monkeyconfig.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js
// @require      https://raw.githubusercontent.com/kawanet/qs-lite/master/dist/qs-lite.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js
// @downloadURL  https://github.com/TechfaneTechnologies/SaveKiteEnctoken/SaveKiteEnctoken.user.js
// @updateURL    https://github.com/TechfaneTechnologies/SaveKiteEnctoken/SaveKiteEnctoken.meta.js
// ==/UserScript==

(function() {
    'use strict';
    const g_config = new MonkeyConfig({
        title: 'SaveKiteEnctoken Settings',
        menuCommand: true,
        onSave: reloadPage,
        params: {
            your_api_key: {
                type: 'text',
                default: ""
            },
            bin_id: {
                type: 'text',
                default: ""
            },
        }
    });
    const YOUR_API_KEY = g_config.get('your_api_key');
    const BIN_ID = g_config.get('bin_id');

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
