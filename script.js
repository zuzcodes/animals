"use strict";

window.addEventListener("DOMContentLoaded", start);

const Animal = {
  name: "",
  desc: "",
  type: "",
  age: 0,
};

const allAnimals = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // create new object with cleaned data
    const animal = Object.create(Animal);

    const splitName = jsonObject.fullname.split(" ");
    console.log(splitName);

    animal.name = splitName[0];
    animal.desc = splitName[2];
    animal.type = splitName[3];
    animal.age = jsonObject.age;

    // store new object with cleaned data in the allAnimals array
    allAnimals.unshift(animal);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
