$(document).ready(function(){
    // iex api


    function stockAPI(userStock){
        // var stock = ["APPL","SNAP","IBM"]
        var stocksUrl = "https://cloud.iexapis.com/stable/stock/"+ userStock +"/chart/" + userStock + "?token=pk_003e5773616f460893f388150fd82418";
            
        $.ajax({
            url: stocksUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for(i=0;i<response.length;i++){
                console.log(response[i].date +" $"+ response[i].close);
            }
        })
    }
    
    function covidAPI(){
        var settings = {
            "url": "https://api.covid19api.com/total/country/united-states/status/confirmed?cases",
            "method": "GET",
            "timeout": 0,
        };
    
            $.ajax(settings).done(function (response) {
                console.log(response);
                for(i=0;i<response.length;i++){
                    console.log("Day " + i + ": "+ response[i].Cases + " Cases");
                }
            });
    }

    stockAPI();

    covidAPI();

})