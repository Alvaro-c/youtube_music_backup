
# YouTube Music List Export

This Tampermonkey script exports a list from YouTube Music to a .txt file




## Requirements

Tampermonkey: https://www.tampermonkey.net/
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
- Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en

## Important

You don't need to log again to YouTube Music or input user or password. The script does not access that information at any moment.
The script is open source, feel free to read it, use it or fork it.

## How to use it

1 - Once Tampermonkey is installed, go to: https://github.com/Alvaro-c/youtube_music_backup/blob/main/YouTube_Music_List_Extractor.user.js

2 - Click "Raw" and click Install on the Tampermonkey screen 

3 - Go to YouTube Music and open the list you want to export

4 - Click to the "Start" button on the top right corner. 

5 - The script will scroll all the way down until all songs are loaded

6 - Once all songs have been loaded, a .txt will be downloaded with all the songs


## Which info is exported?

One row for each song with this format: 

Name_of_The_Song;Name_of_The_Artist;Name_of_The_Album;Song_Duration;YouTube_Music_URL;YouTube_URL

Example: 

```Follow;Crystal Fighters;Crystal Fighters;3:16;https://music.youtube.com/watch?v=7XkPVUGM2UM&list=LM;https://www.youtube.com/watch?v=7XkPVUGM2UM&list=LM  ```

This can be easily pasted in a csv or excel file and separate fields by semi-colon (";")

https://support.microsoft.com/en-us/office/split-text-into-different-columns-with-the-convert-text-to-columns-wizard-30b14928-5550-41f5-97ca-7a3e9c363ed7
