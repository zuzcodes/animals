"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// prototype for all animals 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start() {
    console.log("ready");

    // TODO: add event-listeners to filter buttons
    document.querySelector("[data-filter=cat]").addEventListener("click", showOnlyCats);
    document.querySelector("[data-filter=dog]").addEventListener("click", showOnlyDogs);
    document.querySelector("[data-filter=all]").addEventListener("click", showAllAnimals);

    loadJSON();
}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );

    // TODO: This might not be the function we want to call first.
    // Why not? Complete list needs to be displayed after the page loads, no?
    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

function showOnlyCats() {
    console.log("only cats");
    
    const allCats = [];
    allAnimals.forEach((animal) => {
        if(animal.type == "cat") {
            allCats.push(animal);
        }
    });

    displayList(allCats);
}

function showOnlyDogs() {
    console.log("only dogs");

    const allDogs = [];
    allAnimals.forEach((animal) => {
        if(animal.type == "dog") {
            allDogs.push(animal);
        }
    });

    displayList(allDogs);
}

function showAllAnimals() {
    console.log("all animals");
    
    displayList(allAnimals);
}

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}