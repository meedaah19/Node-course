import fs from 'fs';

const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);

data.name = 'Abike';
data.age = 21;
data.city = 'Ilorin';

const userJson = JSON.stringify(data);
fs.writeFileSync('1-json.json', userJson);