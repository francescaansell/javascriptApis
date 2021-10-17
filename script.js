console.log("hi");

accessData();

function accessData(){
    
    const request = new XMLHttpRequest();
    request.open("GET", "https://dog.ceo/dog-api/breeds-list", true);

    console.log("Access Data entered")

    request.onLoad = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("OK");
            console.log(response);
        } else {
            console.log(`Error occured: Status: ${request.status}`);
        };
        request.send();
    }

}