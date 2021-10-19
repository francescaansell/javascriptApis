//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let origin; 
let data;
let breedData;
let breeds = [];
let breedName; 
let breedImageData;
let imageSrc; 

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
            } 
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
        }
    };
    request.send();
}

function getImage(breedName){
    const request = new XMLHttpRequest();

    url = "https://dog.ceo/api/breed/" + breedName + "/images/random/1";

    request.open("GET", url, true);

    request.onload = function() {
        breedImageData = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Breed Image Response OK.");

            console.log(breedName);
            console.log(breedImageData.message[0])

            imageSrc = breedImageData.message[0];
         
            
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
            imageSrc = "no-image.jpg"
           
        }
    };
    request.send();

    return imageSrc;
    
}



function addRow(selectedBreed, origin, imageSrc){
    //let selectedBreed = document.querySelector("#breeds").value; 

    console.log("Breed: " + selectedBreed + " Origin: " + origin + " Image source: " + imageSrc);

    let tableRow = document.createElement('tr');

    let tableDataBreed = document.createElement('td');
    let tableDataDefinition = document.createElement('td');
    let tableDataImage = document.createElement('td');

    let breedText = document.createTextNode(selectedBreed);
    let definitionText = document.createTextNode(origin);
    

    tableDataBreed.appendChild(breedText);
    tableDataDefinition.appendChild(definitionText);

    let imageElement = document.createElement('img');

    if (imageSrc == ""){

    } else {
        imageElement.setAttribute("src", imageSrc);
        imageElement.setAttribute("alt", "alternate image");
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

    let srcImage;

    breedName = document.querySelector("#breeds").value; 
    console.log("----- User just clicked Add Breed for " + breedName + "-----------------");

    console.log(document.querySelector("#includeImage").checked)

    try {
        if(document.querySelector("#includeImage").checked){
            srcImage = getImage(breedName);
            console.log("In getinfo() getImage(breedName) = " + getImage(breedName))
            
        } else {
            srcImage = "";
        }
    } catch {
        srcImage = "no-image.jpg"
    }
  
    



    console.log("Image source in getInfo(): " + srcImage)

    const request = new XMLHttpRequest();

    let url = "http://api.dictionaryapi.dev/api/v2/entries/en/" + breedName; 
  
    request.open("GET", url, true);

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Info Response OK");  
            origin = data[0].origin;
            //console.log(breedName + " "  + origin);
        }else {
            console.log(`Error occured: Status: ${request.status}`);
            origin = "Unknown"
        }
        addRow(breedName, origin, srcImage);
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







