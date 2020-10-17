
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


        covidAPI();



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

    // covid API
    function covidAPI(){

        // api link, with endpoint of cases per day
        var settings = {
            "url": "https://api.covid19api.com/total/country/united-states/status/confirmed?cases",
            "method": "GET",
            "timeout": 0,
        };
    
        $.ajax(settings).done(function (response) {
            
            // pulls the amount of cases everyday for the last month
            function oneMonth(){
                var month = [];
                var monthData = [];
                for (i=1;i<=30;i++){
                    month.push(response.length -i);
                }
                for (i=0;i<month.length;i++){
                    monthData.push(response[month[i]].Cases); 
                }
                console.log(monthData.reverse());
            }

            // pulls the amount of cases everyday for the last 3 months
            function threeMonths(){
                var three = [];
                var threeData = [];
                for (i=1;i<=90;i++){
                    three.push(response.length -i);
                }
                for (i=0;i<three.length;i++){
                    threeData.push(response[three[i]].Cases); 
                }
                console.log(threeData.reverse());
            }

            // pulls the amount of cases everyday for the last 6 months
            function sixMonths(){
                var six = [];
                var sixData = [];
                for (i=1;i<=180;i++){
                    six.push(response.length -i);
                }
                for (i=0;i<six.length;i++){
                    sixData.push(response[six[i]].Cases); 
                }
                console.log(sixData.reverse());
            }

            // pulls data for all days of corona, starting on Jan 22, 2020 (first case)
            function oneYear(){
                var year = [];
                for (i=0;i<response.length;i++){
                    year.push(response[i].Cases); 
                }
                console.log(year);
            }
            
            // depending on users choice in the dropdown, a timeframe function is ran
            if (timePeriod == "1 Month") {
                oneMonth();
            } else if (timePeriod == "3 Month") {
                threeMonths();
            } else if (timePeriod == "6 Month") {
                sixMonths();
            } else {
                oneYear();
            }     
        });
    }

    // stockAPI();

})