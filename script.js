
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
    
    function covidAPI(){
        
        var settings = {
            "url": "https://api.covid19api.com/total/country/united-states/status/confirmed?cases",
            "method": "GET",
            "timeout": 0,
        };
    
        $.ajax(settings).done(function (response) {
            // console.log(response);

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
            function oneYear(){
                var year = [];
                for (i=0;i<response.length;i++){
                    year.push(response[i].Cases); 
                }
                console.log(year);
            }

            // oneMonth();
            // threeMonths();
            // sixMonths();
            // oneYear();
               
        });
    }

    // stockAPI();

    // covidAPI();



})