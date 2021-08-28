// ==UserScript==
// @name         SaveKiteEnctokenFromPublisher
// @namespace    https://github.com/TechfaneTechnologies/SaveKiteEnctoken
// @version      0.0.1
// @description  The Script Save KiteEnctoken text file from Kite Publisher Page when loogd in
// @author       Quantitative Algo Trading https://t.me/quantalgotradings
// @match        https://kite.zerodha.com/connect/basket*
// @icon         https://www.google.com/s2/favicons?domain=zerodha.com
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// @grant        none
// @downloadURL  https://github.com/TechfaneTechnologies/SaveKiteEnctoken/SaveKiteEnctokenFromPublisher.user.js
// @updateURL    https://github.com/TechfaneTechnologies/SaveKiteEnctoken/SaveKiteEnctokenFromPublisher.meta.js
// ==/UserScript==

(function() {
    'use strict';
    var current_enctoken = window.document.cookie.split('; ').slice(-1)[0].split('enctoken=').slice(-1)[0]
    console.log(current_enctoken)
    var blob = new Blob(["enctoken="+current_enctoken], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "enctoken.txt");
})();
