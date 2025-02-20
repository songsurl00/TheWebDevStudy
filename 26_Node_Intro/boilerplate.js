const fs = require('fs');
const folderName = process.argv[2] || 'Project';


// 비동기 방식 async way
// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log("IN THE CALLBACK!!")
//     if (err) throw err;
// });

// 동기 방식 sync way
// fs.mkdirSync("Cats");
try {
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`, '');
  fs.writeFileSync(`${folderName}/app.js`, '');
  fs.writeFileSync(`${folderName}/styles.css`, '');
} catch (e) {
  console.log('SOMETHING WENT WRONG!!!');
  console.log(e);
}
