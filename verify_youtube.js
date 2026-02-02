
import https from 'https';

const videoId = 'sW4f3Y9qN0k';
const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

console.log(`Checking video: ${videoId}`);
console.log(`URL: ${oembedUrl}`);

https.get(oembedUrl, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            const json = JSON.parse(data);
            console.log('Video found!');
            console.log(`Title: ${json.title}`);
            console.log(`Author: ${json.author_name}`);
            console.log('EMBEDDABLE: YES (OEmbed response received)');
        } else {
            console.log('Video NOT found or NOT embeddable.');
            console.log(`Error: ${data}`);
        }
    });

}).on('error', (err) => {
    console.log('Error: ', err.message);
});
