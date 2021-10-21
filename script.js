//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

let breedData;
let breeds = [];
let breedName; 
let breedImageData;

let imageSrc = '';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

accessBreedData();
getImage("affenpinscher");


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
        console.log(breeds)        
    };
    request.send();
}

function getImage(breedName){
    const request = new XMLHttpRequest();

    url = `https://dog.ceo/api/breed/${breedName}/images/random/1`;

    //Discussed making this call synchronous during class time on 10/20 with Professor Rimland
    request.open("GET", url, false);
    
    request.onload = function() {
       
        breedImageData = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Breed Image Response OK.");
            imageSrc = breedImageData.message[0];
        }
        else{
            console.log(`Error occurred: Status: ${request.status}`);
            imageSrc = ""
        }
        console.log(`getImage() --------- imageSrc: ${imageSrc}`);
    };
    request.send(); 
    return imageSrc;     
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
        let imageElement = document.createElement('img');
        console.log(`addRow ---- imageSrc: ${getImage(selectedBreed)}`);
        imageElement.setAttribute("src", getImage(selectedBreed));
        imageElement.setAttribute("alt", `picture of ${selectedBreed}`);
        tableDataImage.appendChild(imageElement);
    } 
    tableRow.appendChild(tableDataBreed);
    tableRow.appendChild(tableDataDefinition);
    tableRow.appendChild(tableDataImage);    

    document.querySelector("#table").appendChild(tableRow);

    console.log(`---- after adding ${selectedBreed} to the table ------------------------`)
}

function getInfo(){
    breedName = document.querySelector("#breeds").value; 
    console.log(`----- User just clicked Add Breed for ${breedName}-----------------`);

    const request = new XMLHttpRequest();

    let url = `http://api.dictionaryapi.dev/api/v2/entries/en/${breedName}`; 
  
    request.open("GET", url, true);

    request.onload = function() {
        let data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Info Response OK");  
            origin = data[0].origin;
            //console.log(breedName + " "  + origin);
        }else {
            console.log(`Error occured: Status: ${request.status}`);
            origin = "We dont have that word in our API!"
        }
        addRow(breedName, origin);
    };
    request.send();
}

function randomBreed(){
    let breed = breeds[getRandomInt(breeds.length)]
    const request = new XMLHttpRequest();

    let url = `http://api.dictionaryapi.dev/api/v2/entries/en/${breed}`; 

    request.open("GET", url, true);

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Info Response OK");  
            origin = data[0].origin;
        
        }else {
            console.log(`Error occured: Status: ${request.status}`);
            origin = "We dont have that word in our API!"
        }

        addRow(breed, origin);
        //console.log("after addRow call-----------------------------------------")
    };
    request.send();
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

function addComment(){
    let text = document.querySelector("#comment").value; 
   
    let textNode = document.createTextNode(text);
    let line = document.createElement('p');

    line.appendChild(textNode);
    document.querySelector("#commentSection").appendChild(line);

    document.querySelector("#comment").value = ""; 
}
