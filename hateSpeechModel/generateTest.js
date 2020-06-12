let n = 9925;
let k = 2000;
let index = 0;
let testArray = [];
let trainArray = [];

const fs = require('fs');
const data = require('./posts.json');

function formDataset(data) {
  // Creating training and testing dataset
  //
  for (let i = 0; i < Math.round(n / k); i++) {
    index = Math.floor(Math.random() * 10000) + 1;
    console.log(index);
    testArray.push(data[index]);
    data.splice(index, 1);
    trainArray = data;
  }

  fs.writeFile('training.json', JSON.stringify(trainArray), function () { });
  fs.writeFile('testing.json', JSON.stringify(testArray), function () { });

}

formDataset(data);
