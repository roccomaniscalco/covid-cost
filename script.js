
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

        covidAPI();


        console.log(stockName)
        console.log(timePeriod)
        console.log(stockLevel)
        stockAPI(timePeriod)
        

    })
    
    
    
    
    
    // iex api

    function stockAPI(userStock){

        var stocksUrl = "https://sandbox.iexapis.com/stable/stock/AAPL/chart/"+userStock+"/?token=Tpk_66abe4f9dd4941ad8eee2c8005748eb3 ";
            
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