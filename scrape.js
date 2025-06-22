// Koomiksi scraping
// Cheerio on node.js library, aitab sirvida ja manipuleerida HTML ja XML serveri poolt
import * as cheerio from 'cheerio';
// fs- filesystem
import fs from 'fs';

// promise koodi mis ootab millal miski on tehtud enne jätkamist, resolved kuni on täielikult lõpetanud
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getCache(name) {
    // Sync teeb asju samm sammult, ootab millal üks asi on lõpetanud ja siis teeb järgmise
    // Kui on siis tagastab andmed
    if (fs.existsSync(`cache/${name}.html`)) {
        return fs.readFileSync(`cache/${name}.html`, 'utf8');
    }
    return false;
    }

function setCache(name, value) {
    if(!fs.existsSync('cache')){
        fs.mkdirSync('cache')
    }
    fs.writeFileSync(`cache/${name}.html`, value, 'utf-8')
}
    
for(let i = 226; i<236; i++){
    let data = getCache(`cache/${i}.html`)
    if(!data){
        sleep(2000);
        const vastus = await fetch(`https://existentialcomics.com/comic/${i}`) 
        data = await vastus.text();
        setCache(i, data);
        
    }

    // $ muutuja nimena märgitakse funktsiooni või objekti mis kasutatakse valimaks ja muutmaks HTML elementi
    const $ = cheerio.load(data);
    const comicTitle = $('div.title h3').text();
    console.log(comicTitle);
    const img =$('img.comicImg').each((i, el) => {
        const src = $(el).attr('src');
        const imgTile = $(el).attr('title') || 'no title on img' // kui undefined prindib no title on img;
        console.log(imgTile, '\n', src) ;
    });

    console.log('\n');
}

