
import * as si from 'simple-icons';
const keys = Object.keys(si);
const patterns = ['visual', 'amazon', 'azure', 'windows', 'linkedin'];
patterns.forEach(p => {
    console.log(`Searching for ${p}:`);
    keys.filter(k => k.toLowerCase().includes(p)).forEach(k => console.log(`  - ${k}`));
});
