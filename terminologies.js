let tableCount = 0;
let checkArr = [];
let weekKHM;
let weekVIE;
let trainee = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

fetch("./data/VIE.json")
  .then((response) => response.json())
  .then((data) => {
    // data is the parsed JSON object
    // you can assign it to a variable here
    weekKHM = data;
  })
  .catch((error) => {
    console.error("Error reading JSON file:", error);
  });

fetch("./data/KHM.json")
  .then((response) => response.json())
  .then((data) => {
    // data is the parsed JSON object
    // you can assign it to a variable here
    weekVIE = data;
  })
  .catch((error) => {
    console.error("Error reading JSON file:", error);
  });

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
