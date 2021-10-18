//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let origin; 
let data;
let breedData;
let breeds = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

accessBreedData();

function accessBreedData(){
    
    const request = new XMLHttpRequest();

    request.open("GET", "https://dog.ceo/api/breeds/list/all", true);

    request.onload = function() {
        breedData = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Breed Response OK.");

            for (const breed in breedData.message){
                //console.log(breed);
                breeds.push(breed); 
                let dropDown = document.querySelector("#breeds");

                let breedText = document.createTextNode(breed);
                let option = document.createElement('option');

                option.appendChild(breedText);
                dropDown.appendChild(option);
            } 
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
        }
    };
    request.send();
}


function addRow(selectedBreed, origin){
    //let selectedBreed = document.querySelector("#breeds").value; 

    console.log("Selected Item: " + selectedBreed);

    let tableRow = document.createElement('tr');

    let tableDataBreed = document.createElement('td');
    let tableDataDefinition = document.createElement('td');

    let breedText = document.createTextNode(selectedBreed);
    let definitionText = document.createTextNode(origin);

    tableDataBreed.appendChild(breedText);
    tableDataDefinition.appendChild(definitionText);
   

    tableRow.appendChild(tableDataBreed);
    tableRow.appendChild(tableDataDefinition);
    

    document.querySelector("#table").appendChild(tableRow);
}



function getInfo(){
    let breedName = document.querySelector("#breeds").value; 
    const request = new XMLHttpRequest();

    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + breedName; 
  
    request.open("GET", url, true);

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Info Response OK");  
            origin = breedName + " " + data[0].origin;
           
        }else {
            //console.log(`Error occured: Status: ${request.status}`);
            console.log("Cannot find breed");
            origin = breedName + " " + "Unknown"
        }

        addRow(breedName, origin);
    };
    request.send();

    console.log("Origin: " + origin);

    return origin; 


    
}








