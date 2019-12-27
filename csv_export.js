
// const JSON = messageReceived

// const items = JSON.parse

// const replacer = (key, value) => value === null ? 'NO HEADER' : value

// const header = Object.keys(items[0])

// let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
// csv.unshift(header.join(','))
// csv = csv.join('\r\n')

// console.log(csv)


const { parse } = require('json2csv');

const fields = ['listing_name', 'listing_id'];
const opts = { fields };

try {
  const csv = parse(myData, opts);
  console.log(csv);
} catch (err) {
  console.error(err);
}
