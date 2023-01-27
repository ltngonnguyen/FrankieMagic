let tableCount = 0;
let checkArr = [];

let trainee = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

let weekKHM = [
  0,
  [
    { day: 1, start: 0, end: 0 },
    { day: 2, start: 6, end: 57 },
    { day: 3, start: 58, end: 131 },
    { day: 4, start: 131, end: 218 },
    { day: 5, start: 6, end: 218 },
  ],
  [
    { day: 1, start: 219, end: 304 },
    { day: 2, start: 305, end: 372 },
    { day: 3, start: 373, end: 447 },
    { day: 4, start: 448, end: 513 },
    { day: 5, start: 219, end: 513 },
  ],
  [
    { day: 1, start: 514, end: 622 },
    { day: 2, start: 623, end: 710 },
    { day: 3, start: 711, end: 809 },
    { day: 4, start: 810, end: 932 },
    { day: 5, start: 514, end: 932 },
  ],
  [{ day: 1, start: 6, end: 932 }],
];

let weekVIE = [
  0,
  [
    { day: 1, start: 0, end: 0 },
    { day: 2, start: 6, end: 61 },
    { day: 3, start: 62, end: 133 },
    { day: 4, start: 134, end: 222 },
    { day: 5, start: 6, end: 222 },
  ],
  [
    { day: 1, start: 223, end: 309 },
    { day: 2, start: 310, end: 389 },
    { day: 3, start: 390, end: 459 },
    { day: 4, start: 460, end: 534 },
    { day: 5, start: 223, end: 534 },
  ],
  [
    { day: 1, start: 535, end: 631 },
    { day: 2, start: 632, end: 724 },
    { day: 3, start: 725, end: 823 },
    { day: 4, start: 824, end: 953 },
    { day: 5, start: 535, end: 953 },
  ],
  [{ day: 1, start: 6, end: 953 }],
];

function genTable(data) {
  let newTable = document.createElement("table");
  newTable.style.width = "120px";
  newTable.setAttribute("border", "2");
  newTable.setAttribute("id", ++tableCount);

  //create a new div
  let newDiv = document.createElement("div");

  //connect table to div
  newDiv.appendChild(newTable);

  //connect div to html body
  document.body.appendChild(newDiv);

  //create table heads
  let thead = document.createElement("thead");
  newTable.appendChild(thead);

  //create table body
  let tbody = document.createElement("tbody");

  //create 1st row as header row
  let row = document.createElement("tr");
  thead.appendChild(row);

  //iterate through keys of the first object
  for (let key of Object.keys(data[0])) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }

  //create table cells
  for (let elem of data) {
    let row1 = document.createElement("tr");
    for (let key in elem) {
      let cell = document.createElement("td");
      let text = document.createTextNode(elem[key]);
      cell.appendChild(text);
      row1.appendChild(cell);
    }
    tbody.appendChild(row1);
  }

  //put tbody to table
  newTable.appendChild(tbody);
}

//function to generate the terminologies
function randomGen(min, max, amount, lang, stu) {
  let arr = [];
  for (let i = 0; i < amount; i++) {
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    while (checkArr.includes(rand)) {
      rand = Math.floor(Math.random() * (max - min + 1) + min);
    }
    if (lang == "EN") {
      arr.push({
        English: "=Terminology!H" + rand,
        Other: "=Terminology!I" + rand,
        YesNo: " ",
        Student: "=Terminology!B" + trainee[i % stu],
      });
      checkArr.push(rand);
    } else {
      arr.push({
        Other: "=Terminology!I" + rand,
        English: "=Terminology!H" + rand,
        YesNo: " ",
        Student: "=Terminology!B" + trainee[i % stu],
      });
      checkArr.push(rand);
    }
  }
  return arr;
}

//dealing with everything that happens when you click submit
var submitButton = document.getElementById("btnSubmit");

submitButton.onclick = function () {
  //check for current displayed table, if there's something displayed, refresh the page
  if (tableCount >= 2) {
    window.location.reload();
  }
  //declare vars
  let chosenWeek = document.getElementById("week").value;
  let chosenDay = document.getElementById("day").value;
  let chosenLang = document.getElementById("lang").value;
  let chosenStu = document.getElementById("stu").value;
  let chosenWord = eval(
    "week" + String(chosenLang) + "[" + String(chosenWeek) + "]"
  );
  let chosenObj = chosenWord.find((o) => o.day == chosenDay);
  let amount = prompt(
    "Today number of quiz words are: " +
      (chosenObj.end - chosenObj.start) +
      " words \n How many words do you want each quiz rounds to have?",
    0
  );
  let dataEN = randomGen(
    chosenObj.start,
    chosenObj.end,
    amount,
    "EN",
    chosenStu
  );
  genTable(dataEN);
  let dataOT = randomGen(
    chosenObj.start,
    chosenObj.end,
    amount,
    "OT",
    chosenStu
  );
  genTable(dataOT);
};
