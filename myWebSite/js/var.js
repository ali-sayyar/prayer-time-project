let date = new Date();
const todayarea = document.querySelector(".today");
const nextdaybtn = document.querySelector(".next-day");
const afterdaybtn = document.querySelector(".after-day");
const alldaybtn = document.querySelector(".all-day");
const todaybtn = document.querySelector(".to-day");
const alltimearea = document.querySelector(".all-time-area");
const menubtn = document.querySelector(".head .menu");
const themenu = document.querySelector(".the-menu");
const closemenu = document.querySelector(".close-menu");
const blackMenu = document.querySelector(".black-minu");
const nextFajr = document.getElementById("next-fajr");
const citysList = document.querySelectorAll(".citys-list ul li");
const cityTitleName = document.getElementById("city-title-name");
const pLoader = document.querySelector(".p-loader");
// input & select address
const stateSelect = document.getElementById("state-select");
const citySelect = document.getElementById("city-select");
const stateInp = document.getElementById("state-select-inp");
const cityInp = document.getElementById("city-select-inp");
const countrySelect = document.getElementById("country-select");
const countryInp = document.getElementById("country-select-inp");
const sendAddressBtn = document.getElementById("send-address");

// edit time
const editFTimeInp = document.getElementById("editFTime");
const editSTimeInp = document.getElementById("editSTime");
const editDTimeInp = document.getElementById("editDTime");
const editATimeInp = document.getElementById("editATime");
const editMTimeInp = document.getElementById("editMTime");
const editITimeInp = document.getElementById("editITime");

let editTimeFromLocalStorage = JSON.parse(localStorage.getItem("edit-times"));

if (editTimeFromLocalStorage) {
  editFTimeInp.value = editTimeFromLocalStorage.F;
  editSTimeInp.value = editTimeFromLocalStorage.S;
  editDTimeInp.value = editTimeFromLocalStorage.D;
  editATimeInp.value = editTimeFromLocalStorage.A;
  editMTimeInp.value = editTimeFromLocalStorage.M;
  editITimeInp.value = editTimeFromLocalStorage.I;
}

let editFTimeValue = editFTimeInp.value;
let editSTimeValue = editSTimeInp.value;
let editDTimeValue = editDTimeInp.value;
let editATimeValue = editATimeInp.value;
let editMTimeValue = editMTimeInp.value;
let editITimeValue = editITimeInp.value;
//
const allMonth = [
  "محرم",
  "صفر",
  "ربيع الاول",
  "ربيع الثاني",
  "جماد الاول",
  "جماد الثاني",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذوالقعدة",
  "ذوالحجة",
];

const allDay = {
  Monday: `الاثنين`,
  Tuesday: `الثلاثاء`,
  Wednesday: `الاربعاء`,
  Thursday: `الخميس`,
  Friday: `الجمعه`,
  Saturday: `السبت`,
  Sunday: `الاحد`,
};

let box = function (val, _class) {
  return `<div class="box"><div class="mini-box ${_class}">${val}</div></div>`;
};
