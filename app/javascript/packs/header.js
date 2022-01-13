/* eslint-env browser */

function recolorNav() {
  var scrollpos = window.scrollY;
  var header = document.getElementById("header");
  var navcontent = document.getElementById("nav-content");
  var navactionList = document.querySelectorAll(".action-link");
  var brandname = document.getElementById("brandname");
  var toToggle = document.querySelectorAll(".toggleColour");
  var logoImg = document.getElementById("logo");
  var logoDarkImg = document.getElementById("logo-dark");
  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    header.classList.add("bg-white");
    logoImg.classList.add("hidden");
    logoDarkImg.classList.remove("hidden");
    for (var i = 0; i < navactionList.length; i++) {
      let navaction = navactionList[i]
      navaction.classList.remove("bg-white");
      navaction.classList.add("bg-gradient-to-r");
      navaction.classList.add("from-pink-300");
      navaction.classList.add("via-purple-300");
      navaction.classList.add("to-indigo-400");
      navaction.classList.remove("text-gray-800");
      navaction.classList.add("text-white");
    }
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-gray-800");
      toToggle[i].classList.remove("text-white");
    }
    header.classList.add("shadow");
    navcontent.classList.remove("bg-gray-100");
    navcontent.classList.add("bg-white");
  } else {
    header.classList.remove("bg-white");
    logoImg.classList.remove("hidden");
    logoDarkImg.classList.add("hidden");
    for (var i = 0; i < navactionList.length; i++) {
      let navaction = navactionList[i]
      navaction.classList.remove("bg-gradient-to-r");
      navaction.classList.remove("from-pink-300");
      navaction.classList.remove("via-purple-300");
      navaction.classList.remove("to-indigo-400");
      navaction.classList.add("bg-white");
      navaction.classList.remove("text-white");
      navaction.classList.add("text-gray-800");
    }
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-white");
      toToggle[i].classList.remove("text-gray-800");
    }

    header.classList.remove("shadow");
    navcontent.classList.remove("bg-white");
    // navcontent.classList.add("bg-gray-100");
  }
}

function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}

function addLinks(){
  var navMenuDiv = document.getElementById("nav-content");
  var navMenu = document.getElementById("nav-toggle");

  document.onclick = check;
  function check(e) {
    var target = (e && e.target) || (event && event.srcElement);

    if (!checkParent(target, navMenuDiv)) {
      if (checkParent(target, navMenu)) {
        if (navMenuDiv.classList.contains("hidden")) {
          navMenuDiv.classList.remove("hidden");
        } else {
          navMenuDiv.classList.add("hidden");
        }
      } else {
        navMenuDiv.classList.add("hidden");
      }
    }
  }
}

document.addEventListener("scroll", function () {
  recolorNav();
});

document.addEventListener('turbolinks:load', addLinks, false);
document.addEventListener('turbolinks:load', recolorNav, false);
