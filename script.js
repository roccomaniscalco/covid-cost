
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

        if(timePeriod === "1 Month"){
            var timeReplace = timePeriod.replace("1 Month", "1m")
        }else if (timePeriod === "3 Month"){
            timeReplace = timePeriod.replace("3 Month", "3m")
        }else if (timePeriod === "6 Month"){
            timeReplace = timePeriod.replace("6 Month", "6m")
        }else if (timePeriod === "1 Year"){
            timeReplace = timePeriod.replace("1 Year", "1y")
        }

        console.log(timeReplace)

        console.log(stockName)
        console.log(stockLevel)
        stockAPI(timeReplace)
        
    })
    
    
    
    
    
    // iex api

    function stockAPI(userStock){

        var stocksUrl = "https://sandbox.iexapis.com/stable/stock/AAPL/chart/"+userStock+"/?token=Tsk_91ce3ae3fe794e6db9ebe0705266abf6";
            
        $.ajax({
            url: stocksUrl,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for(i=0;i<response.length;i++){
                // console.log(response[i].date +" $"+ response[i].close);
                if(stockLevel === "Open"){
                    console.log(response[i].open)
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