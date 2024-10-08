let timing;
let fullYearTime;
let hijriDate = HijriJS.today();
const negative_num = 1;
let day = HijriJS.today().day - negative_num;
let HJMonth = hijriDate.month;
let timeOfCity = "اخند";
let timeOfCountry = "iran";
let timeOfState = "بوشهر";
// cityTitleName
let titleName;
localStorage.getItem("address")
  ? (titleName = JSON.parse(localStorage.getItem("address")).title)
  : (titleName = timeOfCity);
cityTitleName.innerHTML = titleName;
getAddressFromLocalStorge();
//
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {})
      .catch((error) => {});
  });
}
// run loader fun
function runLoader(opas) {
  pLoader.style.display = "flex";
  if (opas == 1) {
    pLoader.style.opacity = "0.9";
  }
}

const editTimeFun = () => {
  let obj = {
    F: editFTimeInp.value,
    S: editSTimeInp.value,
    D: editDTimeInp.value,
    A: editATimeInp.value,
    M: editMTimeInp.value,
    I: editITimeInp.value,
  };
  localStorage.setItem("edit-times", JSON.stringify(obj));
  editFTimeValue = editFTimeInp.value;
  editSTimeValue = editSTimeInp.value;
  editDTimeValue = editDTimeInp.value;
  editATimeValue = editATimeInp.value;
  editMTimeValue = editMTimeInp.value;
  editITimeValue = editITimeInp.value;
  createTime();
  //
};

//

function createStatesSelection() {
  states_list.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.name;
    option.innerHTML = el.name;
    option.dataset.id = el.id;
    stateSelect.append(option);
  });
}
createStatesSelection();

function createcitisSelection() {
  citySelect.innerHTML = "";
  let filterCitis = [];
  filterCitis = citis_list.filter((el) => {
    return (
      el.province_id ==
      stateSelect.options[stateSelect.selectedIndex].dataset.id
    );
  });
  filterCitis.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.name;
    option.innerHTML = el.name;
    option.dataset.id = el.id;
    citySelect.append(option);
  });
}
//
function changeStateFun() {
  createcitisSelection();
  changeInputAddress();
}
changeStateFun();

function changeCityFun() {
  changeInputAddress();
}
changeCityFun();

function changeInputAddress() {
  stateInp.value = stateSelect.value;
  cityInp.value = citySelect.value;
  countryInp.value = countrySelect.value;
  createcitisSelection();
}
changeInputAddress();

// send address
sendAddressBtn.addEventListener("click", function () {
  if (
    countryInp.value.length > 1 &&
    stateInp.value.length > 1 &&
    cityInp.value.length > 1
  ) {
    timeOfCountry = countryInp.value;
    timeOfState = stateInp.value;
    timeOfCity = cityInp.value;
    titleName = cityInp.value;
    getTiming();
    blackBox.click();
  }
});

//

citysList.forEach((li) => {
  li.addEventListener("click", () => {
    li.dataset.city ? (timeOfCity = li.dataset.city) : (timeOfCity = "");
    li.dataset.state ? (timeOfState = li.dataset.state) : (timeOfState = "");
    li.dataset.country
      ? (timeOfCountry = li.dataset.country)
      : (timeOfCountry = "");
    getTiming();
    blackBox.click();
    titleName = li.innerHTML;
  });
});
//

// save address in localStorge
function saveAddressInLocalStorge() {
  let obj = {
    country: timeOfCountry,
    state: timeOfState,
    city: timeOfCity,
    title: cityTitleName.innerHTML,
  };

  localStorage.setItem("address", JSON.stringify(obj));
}
// get address from localstorge
function getAddressFromLocalStorge() {
  let obj = JSON.parse(localStorage.getItem("address"));
  if (obj) {
    timeOfCountry = obj.country;
    timeOfState = obj.state;
    timeOfCity = obj.city;
    cityTitleName.innerHTML = obj.title;
  }
}

//

function getTiming() {
  runLoader();
  fetch(
    `https://api.aladhan.com/v1/hijriCalendarByAddress/${hijriDate.year}/${hijriDate.month}?address=${timeOfCountry} ${timeOfState} ${timeOfCity}?x7xapikey=a40781aef9e97ae7af3e549fb6a4e5ed&annual=true&method=4`
  )
    .then((res) => res.json())
    .then((res) => {
      pLoader.style.display = "none";
      fullYearTime = res.data;
      timing = fullYearTime[HJMonth];
      createTime();
      timing[day + 1]
        ? (nextFajr.innerHTML = timing[day + 1].timings.Fajr.split(" ")[0])
        : (nextFajr.innerHTML = timing[day].timings.Fajr.split(" ")[0]);
      //
      cityTitleName.innerHTML = titleName;
      saveAddressInLocalStorge();
    });
}
getTiming();

function createTime() {
  const arabicToPersianDate = arabicToPersianNumbers(
    `${hijriDate.year}/${add0(hijriDate.month)}/${add0(hijriDate.day)}`
  );
  todayarea.innerHTML = `<div class='ch-today'>
        <div class="hijriSlider"><span style="color:#222222e8;">(${
          allMonth[hijriDate.month - 1]
        })</span>  يوم ${date.toLocaleDateString("ar", {
    weekday: "long",
  })} ${arabicToPersianDate}</div>
        <div class="shamsiSlider"><span style="color:#222222e8;">(${date.toLocaleDateString(
          "fa-IR",
          { month: "long" }
        )})</span> ${date.toLocaleDateString("fa-IR", {
    weekday: "long",
  })} ${date.toLocaleDateString("fa-IR")}</div>
        <div class="meladiSlider"><span style="color:#222222e8;">(${date.toLocaleDateString(
          "ar",
          {
            month: "long",
          }
        )})</span> ${date.toLocaleDateString("ar-EG", {
    dateStyle: "medium",
  })}</div>
    </div>`;
  document.querySelector(`.time .Fajr span`).innerHTML = spt(
    timing[day].timings.Fajr,
    editFTimeValue
  );
  document.querySelector(`.time .Sunrise span`).innerHTML = spt(
    timing[day].timings.Sunrise,
    editSTimeValue
  );
  document.querySelector(`.time .Dhuhr span`).innerHTML = spt(
    timing[day].timings.Dhuhr,
    editDTimeValue
  );
  document.querySelector(`.time .Asr span`).innerHTML = spt(
    timing[day].timings.Asr,
    editATimeValue
  );
  document.querySelector(`.time .Maghrib span`).innerHTML = spt(
    timing[day].timings.Maghrib,
    editMTimeValue
  );
  document.querySelector(`.time .Isha span`).innerHTML = spt(
    timing[day].timings.Isha,
    editITimeValue
  );
}

nextdaybtn.addEventListener("click", () => {
  if (day == timing.length - 1) {
    HJMonth++;
    timing = fullYearTime[HJMonth];
    day = -1;
  }
  day++;
  date.setDate(date.getDate() + 1);
  hijriDate = HijriJS.toHijri(
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  );
  createTime();
});
afterdaybtn.addEventListener("click", () => {
  if (day == 0) {
    HJMonth--;
    timing = fullYearTime[HJMonth];
    day = timing.length;
  }
  day--;
  date.setDate(date.getDate() - 1);
  hijriDate = HijriJS.toHijri(
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  );
  createTime();
});
todaybtn.addEventListener("click", () => {
  day = HijriJS.today().day - negative_num;
  date = new Date();
  hijriDate = HijriJS.toHijri(
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  );
  createTime();
});

alldaybtn.addEventListener("click", () => {
  alltimearea.innerHTML = `
        <div class="line">
            <div class="mini-div close">X</div>
            <div class="mini-div">الشهر</div>
            <div class="mini-div">الفجر</div>
            <div class="mini-div">الشروق</div>
            <div class="mini-div">الظهر</div>
            <div class="mini-div">العصر</div>
            <div class="mini-div">المغرب</div>
            <div class="mini-div">العشاء</div>
        </div>
    `;
  fullYearTime[HijriJS.today().month].forEach((el, i) => {
    let line = document.createElement("div");
    line.classList.add("line");
    let time = el.timings;
    line.innerHTML = `
                <div class="mini-div">${
                  allDay[
                    moment(el.date.hijri.date, "iD-iM-iYYYY").format("dddd")
                  ]
                }</div>
                <div class="mini-div">${i + 1}</div>
                <div class="mini-div">${spt(time.Fajr)}</div>
                <div class="mini-div">${spt(time.Sunrise)}</div>
                <div class="mini-div">${spt(time.Dhuhr)}</div>
                <div class="mini-div">${spt(time.Asr)}</div>
                <div class="mini-div">${spt(time.Maghrib, 2)}</div>
                <div class="mini-div">${spt(time.Isha, 2)}</div>
        `;
    alltimearea.appendChild(line);
  });
  // hide All Times Erea
  document
    .querySelector(".all-time-area .close")
    .addEventListener("click", () => {
      alltimearea.innerHTML = "";
    });
});

function spt(time, num) {
  let _time = time.split(" ")[0];
  if (num && !isNaN(Number(num))) {
    let d = new Date();
    d.setHours(_time.split(":")[0]);
    d.setMinutes(Number(_time.split(":")[1]) + Number(num));
    _time = `${add0(d.getHours())}:${add0(d.getMinutes())}`;
  }
  return _time;
}
function add0(n) {
  return n < 10 ? "0" + n : n;
}

function arabicToPersianNumbers(str) {
  const arabicNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return str.replace(/\d/g, function (digit) {
    return persianNumbers[arabicNumbers.indexOf(digit)];
  });
}

function createModel() {
  let f = "",
    s = "",
    d = "",
    a = "",
    m = "",
    i = "";
  let model = document.createElement("div");
  model.className = "time-edit-model";

  if (editFTimeValue && !isNaN(Number(editFTimeValue)))
    f = ` الفجر: ${editFTimeValue}  `;
  if (editSTimeValue && !isNaN(Number(editSTimeValue)))
    s = ` الشروق: ${editSTimeValue} `;
  if (editDTimeValue && !isNaN(Number(editDTimeValue)))
    d = ` الظهر: ${editDTimeValue}  `;
  if (editATimeValue && !isNaN(Number(editATimeValue)))
    a = ` العصر: ${editATimeValue}  `;
  if (editMTimeValue && !isNaN(Number(editMTimeValue)))
    m = ` المغرب: ${editMTimeValue} `;
  if (editITimeValue && !isNaN(Number(editITimeValue)))
    i = ` العشاء: ${editITimeValue}  `;

  if (f || s || d || a || m || i) {
    model.innerHTML = `
    المواقيت تم تعديلها <br>
     ${f}   ${s}   ${d}   ${a}   ${m}   ${i} دقائق
    `;
    document.body.appendChild(model);
    setTimeout(() => {
      model.remove();
    }, 9000);
  }
}
createModel();
