
$(document).ready(function(){
    // JS Variables

    stockLevel = "";
    stockName = "";
    timePeriod = "";


    // event listener
    $("#stockSubmitBtn").on("click", function(event){
        event.preventDefault()
        stockLevel = $(this).parent().find("#stockPoint").val();
        stockName = $(this).parent().find("#stockInput").val();
        timePeriod = $(this).parent().find("#stockTime").val();
        // console.log($(this).parent().find("#stockInput").val());
        // console.log($(this).parent().find("#stockPoint").val());
        // console.log($(this).parent().find("#stockTime").val());
    })
    
    
    
    
    
    // iex api

    function stockAPI(){
        var stock = ["APPL","GUSH","SNAP","IBM"];
        var range = ["1m","3m","6m","1y"];
        var stocksUrl = "https://cloud.iexapis.com/stable/stock/"+ stock[1] +"/chart/"+range[2]+"/?token=pk_daa92b10b8a84ee7bf59805aa6b96c62";
            
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
                    console.log(response[i].Date + ": "+ response[i].Cases + " Cases");
                }
            });
    }

    // stockAPI();

    // covidAPI();

})