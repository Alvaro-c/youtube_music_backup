// ==UserScript==
// @name         Youtube Music Extractor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://music.youtube.com/playlist?list=LM
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let count = 0
    let cleanedText = '';
    let url = ''
    let rowTagName = 'ytmusic-responsive-list-item-renderer';
    let rows = document.getElementsByTagName(rowTagName);

    let lastRowNumber = 0
    let newRowNumber = rows.length


    const delay = ms => new Promise(res => setTimeout(res, ms));

    function cleanString(str) {
        str = str.replace(startSeparator, ";");
        str = str.replace
    }


    async function getMusic() {
        // while (newRowNumber > lastRowNumber) {
        while (count < 1) {

            console.log(`Previous number of rows: ${lastRowNumber}`);
            console.log(`Current number of rows: ${newRowNumber}`);
            console.log(`Continue?: ${newRowNumber > lastRowNumber}`);

            lastRowNumber = document.getElementsByTagName(rowTagName).length;

            // await scrollDown()
            // if (count < 2) {
            //     await scrollDown()
            // }

            newRowNumber = document.getElementsByTagName(rowTagName).length;

            count++;
            console.log(`Times scrolled down: ${count}`);
        }

        getListOfSongs()
    }


    const scrollDown = async () => {
        await delay(5000);
        console.log("Waited 5s");
        window.scrollTo(0, document.body.scrollHeight);
        console.log('Scrolling down...')

    };


    function getListOfSongs() {


        console.log(`Found ${rows.length} songs`)
        console.log("flag");

        rows = document.getElementsByTagName(rowTagName);

        for (let i = 0; i < rows.length; i++) {
            cleanedText = rows[i].innerText.replaceAll("\n", "; ");
            url = rows[i].innerText.getElementsByTagName('a')[0].href;
            console.log("flag");
            console.log(url);
            cleanedText = `${cleanedText}; ${url}`;
            console.log(cleanedText);

        }

    }


    getMusic()










})();