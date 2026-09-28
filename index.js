const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";

// const DATE = moment().format();
const DATE = moment().subtract(3, "d").format();
console.log(DATE);
const data = {
  date: DATE,
};

jsonfile.writeFile(FILE_PATH, data, () => {
  simpleGit().add([FILE_PATH]).commit(DATE, { "--date": DATE }).push();
});

// const makeCommit = (x, y) => {
//   //   const DATE = moment()
//   //     .subtract(1, "y")
//   //     .add(1, "d")
//   //     .add(x, "w")
//   //     .add(y, "d")
//   //     .format();
//   // const DATE = moment().subtract(3, "d").format();
//   const DATE = moment().format();
//   console.log(DATE);
//   const data = {
//     date: DATE,
//   };

//   jsonfile.writeFile(FILE_PATH, data, () => {
//     simpleGit().add([FILE_PATH]).commit(DATE, { "--date": DATE }).push();
//   });
// };

// makeCommit(3, 3);
