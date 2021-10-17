console.log("script.js connected");
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let breedData;
let factsData;
let breeds = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

accessBreedData();

function accessBreedData(){
    console.log("Test");
    
    const request = new XMLHttpRequest();

    request.open("GET", "https://dog.ceo/api/breeds/list/all", true);

    request.onload = function() {
        breedData = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Response OK.");

            for (const breed in breedData.message){
                //console.log(breed);
                breeds.push(breed); 
            } 
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
        }
    };
    request.send();
}

function getRandomBreed(){
    let num = getRandomInt(breeds.length);
    //console.log(num);
    //console.log(breeds[num]);

    let tableRow = document.createElement('tr');
    let tableDataBreed = document.createElement('td');
    let tableDataFact = document.createElement('td');

    let breedText = document.createTextNode(breeds[num]);

    facts = getFacts(breeds[num])
    for (const fact of facts){
        let factText = document.createTextNode(fact);
        tableDataFact.appendChild(factText);
    }
  
    tableDataBreed.appendChild(breedText);

    tableRow.appendChild(tableDataBreed);
    tableRow.appendChild(tableDataFact);

    document.querySelector("#table").appendChild(tableRow);
}

function getFacts(breedName){
    console.log("Text Facts");

    const request = new XMLHttpRequest();

    //let url = "http://dog-api.kinduff.com/api/facts?number=" + breedName.length;
    //console.log(url);

    request.open("GET", "http://dog-api.kinduff.com/api/facts", true);

    let facts = [];

    request.onload = function() {
        factsData = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Response OK");
            for (const fact in factsData.facts){
                facts.push(fact);
                console.log(fact);
            }
        }else {
            console.log(`Error occured: Status: ${request.status}`);
        }
    };
    request.send();

    return facts; 
    
}








