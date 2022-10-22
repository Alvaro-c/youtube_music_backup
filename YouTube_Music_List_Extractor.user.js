// ==UserScript==
// @name         Youtube Music Extractor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Download the list of songs from a YouTube Music List into a .txt
// @author       Alvaro-c
// @match        https://music.youtube.com/playlist*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://gist.github.com/Alvaro-c/youtube_music_backup/blob/main/YouTube_Music_List_Extractor.user.js
// @downloadURL  https://gist.github.com/Alvaro-c/youtube_music_backup/blob/main/YouTube_Music_List_Extractor.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let count = 0;
    let rowTagName = 'ytmusic-responsive-list-item-renderer';
    let rows = document.getElementsByTagName(rowTagName);

    let lastRowNumber = 0
    let newRowNumber = rows.length

    document.addEventListener('DOMContentLoaded', showActionButton());

    function showActionButton() {
        let button = document.createElement('button');
        button.setAttribute("id", "start-scrap-button");
        button.setAttribute("style", "width: 80px;height: 25px;position: absolute;left: 93%;top:20px;z-index:50")
        button.innerText = "Start"
        button.addEventListener('click', loadFullList)
        document.body.appendChild(button);
    

    }


    const delay = ms => new Promise(res => setTimeout(res, ms));

    const scrollDown = async () => {
        await delay(10000);
        console.log("Waited 10s");
        console.log('Scrolling down...')
        window.scrollTo(0, document.body.scrollHeight);


    };

    function getListOfSongs() {

        let string = '';
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
            let newsong = `${songName};${artistName};${albumName};${songDuration};${url};${youtubeURL}`
            console.log(newsong);
            string = string + newsong + "\n";


        }

        saveList(string, "list.txt");

    }

    async function loadFullList() {

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


    const saveList = (function () {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            let blob = new Blob([data], {type: "octet/stream"});
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());



})();