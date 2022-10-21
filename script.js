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

    let count = 0;
    let rowTagName = 'ytmusic-responsive-list-item-renderer';
    let rows = document.getElementsByTagName(rowTagName);

    let lastRowNumber = 0
    let newRowNumber = rows.length


    const delay = ms => new Promise(res => setTimeout(res, ms));


    async function getMusic() {
        while (newRowNumber > lastRowNumber) {

            console.log(`Previous number of rows: ${lastRowNumber}`);
            console.log(`Current number of rows: ${newRowNumber}`);
            console.log(`Continue?: ${newRowNumber > lastRowNumber}`);

            lastRowNumber = document.getElementsByTagName(rowTagName).length;

            await scrollDown()
            if (count < 2) {
                await scrollDown()
            }

            newRowNumber = document.getElementsByTagName(rowTagName).length;

            count++;
            console.log(`Times scrolled down: ${count}`);
        }

        getListOfSongs()
    }


    const scrollDown = async () => {
        await delay(10000);
        console.log("Waited 10s");
        console.log('Scrolling down...')
        window.scrollTo(0, document.body.scrollHeight);


    };


    function getListOfSongs() {


        console.log(`Found ${rows.length} songs`)

        rows = document.getElementsByTagName(rowTagName);
        for (let i = 0; i < rows.length; i++) {

            let songName = rows[i].getElementsByTagName('a')[0].innerHTML;

            let artistName = ''
            if(rows[i].getElementsByTagName('a').length>1) {
                artistName = rows[i].getElementsByTagName('a')[1].innerHTML;
            } else {
                artistName = rows[i].getElementsByTagName('yt-formatted-string')[1].innerText
            }

            let songDuration = rows[i].lastChild.previousSibling.innerText;
            let url = rows[i].getElementsByTagName('a')[0].href;
            let youtubeURL = url.replace('https://music.', 'https://www.');

            let albumName = ''
            if (rows[i].getElementsByTagName('a').length > 2) {
                albumName = rows[i].getElementsByTagName('a')[2].innerHTML;
            }

            songName = songName.replaceAll('&amp;', '&');
            artistName = artistName.replaceAll('&amp;', '&');
            albumName = artistName.replaceAll('&amp;', '&');
            console.log(`${songName};${artistName};${albumName};${songDuration};${url};${youtubeURL}`);

        }

    }


    getMusic()










})();