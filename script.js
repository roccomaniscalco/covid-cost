
$(document).ready(function(){
    // JS Variables

    var stockLevel = "";
    var stockName = "";
    var timePeriod = "";


    // event listener
    $("#stockSubmitBtn").on("click", function(event){
        event.preventDefault()
        stockLevel = $(this).parent().find("#stockPoint").val();
        stockName = $(this).parent().find("#stockInput").val();
        timePeriod = $(this).parent().find("#stockTime").val();

        console.log(stockName)
        console.log(timePeriod)
        console.log(stockLevel)
        stockAPI(timePeriod)
        
    })
    
    
    
    
    
    // iex api

<<<<<<< HEAD
    function stockAPI(userStock){

        var stocksUrl = "https://sandbox.iexapis.com/stable/stock/AAPL/chart/"+userStock+"/?token=Tpk_66abe4f9dd4941ad8eee2c8005748eb3 ";
=======

    function stockAPI(){
        var stock = ["APPL","GUSH","SNAP","IBM"];
        var range = ["1m","3m","6m","1y"];
        var stocksUrl = "https://cloud.iexapis.com/stable/stock/"+ stock[1] +"/chart/"+range[2]+"/?token=pk_daa92b10b8a84ee7bf59805aa6b96c62";
>>>>>>> 52b26c04e5dd78ab6a0f53cc6cad381b28dbb4b6
            
        $.ajax({
            url: stocksUrl,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for(i=0;i<response.length;i++){
                // console.log(response[i].date +" $"+ response[i].close);
                if(stockLevel === "Open"){
                    console.log(response[i].date + " $" + response[i].open.toString())
                }else if(stockLevel === "Closing"){
                    console.log(response[i].date + " $" + response[i].close.toString())
                }else if(stockLevel === "High"){
                    console.log(response[i].date + " $" + response[i].high.toString())
                }
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
                    console.log(response[i].Date + ": "+ response[i].Cases + " Cases");
                }
            });
    }

    // stockAPI();

    // covidAPI();

})