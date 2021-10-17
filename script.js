console.log("hi");

accessData();

function accessData(){
    
    const request = new XMLHttpRequest();
    request.open("GET", "https://foodish-api.herokuapp.com/", true);

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