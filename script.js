//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let origin; 
let breedData;
let breeds = [];
let breedName; 
let breedImageData;

let images = []; 


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

                //populateTable(breed);
                //console.log("accessBreedData----- getImage(breed): " + getImage(breed));

                getImage(breed);
                
            } 
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
        }
        console.log(images)
    };
    request.send();
}

function getImage(breedName){
    const request = new XMLHttpRequest();

    url = "https://dog.ceo/api/breed/" + breedName + "/images/random/1";

    request.open("GET", url, true);

    request.onload = function() {
        let imageSrc; 
        breedImageData = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Breed Image Response OK.");
            //console.log(breedImageData.message[0])
            imageSrc = breedImageData.message[0];
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
            imageSrc = "no-image.jpg"
        }
        console.log("getImage() --------- imageSrc: " + imageSrc);
        images.push(imageSrc)
    };
    request.send();    
}

function addRow(selectedBreed, origin){
    let tableRow = document.createElement('tr');

    let tableDataBreed = document.createElement('td');
    let tableDataDefinition = document.createElement('td');
    let tableDataImage = document.createElement('td');

    let breedText = document.createTextNode(selectedBreed);
    let definitionText = document.createTextNode(origin);
    
    tableDataBreed.appendChild(breedText);
    tableDataDefinition.appendChild(definitionText);

    if(document.querySelector("#includeImage").checked){
        console.log("entered checked------------------")
        console.log(document.querySelector("#breeds").selectedIndex)

        let imageElement = document.createElement('img');
        console.log("src: " + images[document.querySelector("#breeds").selectedIndex])
        imageElement.setAttribute("src", images[document.querySelector("#breeds").selectedIndex]);
        imageElement.setAttribute("alt", "alt");
        tableDataImage.appendChild(imageElement);
    } 
    tableRow.appendChild(tableDataBreed);
    tableRow.appendChild(tableDataDefinition);
    tableRow.appendChild(tableDataImage);    

    document.querySelector("#table").appendChild(tableRow);

    //console.log("---- after adding " + selectedBreed + " to the table ------------------------")
}

//Gets called when user clicks Add Breed

function getInfo(){
    breedName = document.querySelector("#breeds").value; 
    console.log("----- User just clicked Add Breed for " + breedName + "-----------------");

    const request = new XMLHttpRequest();

    let url = "http://api.dictionaryapi.dev/api/v2/entries/en/" + breedName; 
  
    request.open("GET", url, true);

    request.onload = function() {
        let data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Info Response OK");  
            origin = data[0].origin;
            //console.log(breedName + " "  + origin);
        }else {
            console.log(`Error occured: Status: ${request.status}`);
            origin = "Unknown"
        }
        addRow(breedName, origin);
    };
    request.send();
}

function populateTable(breed){

    console.log("populate table")    
    console.log(breed);


    const request = new XMLHttpRequest();

    let url = "http://api.dictionaryapi.dev/api/v2/entries/en/" + breed; 

    request.open("GET", url, true);

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Info Response OK");  
            origin = breed + " " + data[0].origin;
        
        }else {
            console.log(`Error occured: Status: ${request.status}`);
            console.log("Cannot find breed");
            origin = breed + " " + "Unknown"
        }

        addRow(breed, origin);
    };
    request.send();

    console.log("Origin: " + origin);
}

function clearTable(){

    let table = document.querySelector("#table"); 
    table.innerHTML = ""; 

    let tableRow = document.createElement('tr');

    let thBreed = document.createElement('th');
    let thOrigin = document.createElement('th');

    let breedText = document.createTextNode("Breed Name")
    let originText = document.createTextNode("Breed Name Origin")

    thBreed.appendChild(breedText);
    thOrigin.appendChild(originText);
   

    tableRow.appendChild(thBreed);
    tableRow.appendChild(thOrigin);
    table.appendChild(tableRow);
    

    document.querySelector("#table").appendChild(tableRow); 
}







