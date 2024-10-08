const mainMinu = document.querySelector(".head nav ul");
const blackBox = document.querySelector(".head nav .black-box");

const night = document.querySelector(".head nav .night");
const dark = document.querySelector(".head nav .dark");
const green = document.querySelector(".head nav .green");
const cyan = document.querySelector(".head nav .cyan");
let root = document.documentElement;

menubtn.onclick = function () {
  mainMinu.classList.toggle("none");
  blackBox.classList.toggle("none");
};

blackBox.onclick = function () {
  mainMinu.classList.toggle("none");
  blackBox.classList.toggle("none");
};
locTheme = localStorage.getItem("webSiteTheme");
if (locTheme) {
  locTheme == "light"
    ? chengeColor("#d1d1d1", "#a5a5a5", "#787878", "#787878", "#000")
    : "";
  locTheme == "dark"
    ? chengeColor("#333", "#222", "#555", "#666", "#ffffffe6")
    : "";
  locTheme == "green"
    ? chengeColor("darkgreen", "#084308", "#4d960d", "#418506", "#ffffffe6")
    : "";
}

function chengeColor(c1, c2, c3, c4, c5) {
  root.style.setProperty("--c1", c1);
  root.style.setProperty("--c2", c2);
  root.style.setProperty("--c3", c3);
  root.style.setProperty("--btn-c", c4);
  root.style.setProperty("--text-c", c5);
}

night.onclick = function () {
  chengeColor("#d1d1d1", "#a5a5a5", "#787878", "#787878", "#000");
  localStorage.setItem("webSiteTheme", "light");
};

dark.onclick = function () {
  chengeColor("#333", "#222", "#555", "#666", "#ffffffe6");
  localStorage.setItem("webSiteTheme", "dark");
};

green.onclick = function () {
  chengeColor("darkgreen", "#084308", "#4d960d", "#418506", "#ffffffe6");
  localStorage.setItem("webSiteTheme", "green");
};
