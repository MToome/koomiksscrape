// Koomiksi scraping
// Cheerio on node.js library, aitab sirvida ja manipuleerida HTML ja XML serveri poolt
import * as cheerio from 'cheerio';
// fs- filesystem
import fs from 'fs';

function getCache(name) {
    // Sync teeb asju samm sammult, ootab millal üks asi on lõpetanud ja siis teeb järgmise
    // Kui on siis tagastab andmed
    if (fs.existsSync(`cache/${name}.html`)) {
        return fs.readFileSync(`cache/${name}.html`, 'utf8');
    }
    return false;
    }

function setCache(name, value) {
    if(!fs.existsSync(cache)){
        fs.mkdirSync(cache)
    }
    fs.writeFileSync(`cache/${name}.html`, value, 'utf-8')
}
    

