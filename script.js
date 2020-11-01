$(document).ready(function () {
  // JS Variables

    displayStockGraph();
    displayCovidGraph();

    var stockLevel = "";
    var stockName = "";
    var timePeriod = "";

    var covidData = []

    var chartStockData = [];


  // event listener
  $("#stockSubmitBtn").on("click", function (event) {
    event.preventDefault();
    stockLevel = $(this).parent().find("#stockPoint").val();
    stockName = $(this).parent().find("#stockInput").val().toUpperCase();
    timePeriod = $(this).parent().find("#stockTime").val();
    stockNameUpdate();
    covidTimeUpdate();

    // Converting the user dropdown selection to the needed value for the API call requirements
    if (timePeriod === "1 Month") {
      var timeReplace = timePeriod.replace("1 Month", "1m");
    } else if (timePeriod === "3 Month") {
      timeReplace = timePeriod.replace("3 Month", "3m");
    } else if (timePeriod === "6 Month") {
      timeReplace = timePeriod.replace("6 Month", "6m");
    } else if (timePeriod === "1 Year") {
      timeReplace = timePeriod.replace("1 Year", "1y");
    }

    // console.log(timeReplace);

    covidAPI();

    // console.log(stockName);
    // console.log(stockLevel);
    stockAPI(stockName, timeReplace);
  });

  // modal
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });

  // Stock Chart comments name update

  function stockNameUpdate() {
    $("#stockChartComments").text(stockName + " Chart Metrics");
    $("#stockChartHead").text(stockName + " Prices in USD Over " + timePeriod);
  }

  function covidTimeUpdate () {



    $("#covidChartHead").text("US Covid Cases in Millions Over " + timePeriod);

  }
  // iex api

  function stockAPI(userStock, userTime) {
    var stocksUrl =
      "https://sandbox.iexapis.com/stable/stock/" +
      userStock +
      "/chart/" +
      userTime +
      "/?token=Tsk_91ce3ae3fe794e6db9ebe0705266abf6";

    $.ajax({
      url: stocksUrl,
      method: "GET",
    }).then(function (response) {
      // console.log(response);

      // Creating empty arrays to later push response to based on user validation
      var stockLevelArray = [];
      var chartStockData = [];
      var stockData;


      // If stock level is open push the response into the stockLevelArray
      if (stockLevel === "Open") {
        for (var i = 0; i < response.length; i++) {
          stockData = response[i].open;
          stockLevelArray.push(stockData);

          chartStockData.push({t: moment(response[i].date), y: response[i].open})

        }
        // console.log(chartStockData)
        // console.log(stockLevelArray);

        // If stock level is closing push the response into the stockLevelArray
      } else if (stockLevel === "Closing") {
        for (var i = 0; i < response.length; i++) {
          stockData = response[i].close;
          stockLevelArray.push(stockData);

          chartStockData.push({t: moment(response[i].date), y: response[i].close})

        }
        // console.log(chartStockData)
        // console.log(stockLevelArray);

        // If stock level is high push the response into the stockLevelArray
      } else if (stockLevel === "High") {
        for (var i = 0; i < response.length; i++) {
          stockData = response[i].high;
          stockLevelArray.push(stockData);

          chartStockData.push({t: moment(response[i].date), y: response[i].high})

        }
        // console.log(chartStockData)
        // console.log(stockLevelArray);
      }
      // finding max Min
      $("#stockMax").text("Max Value: $"+Math.max(...stockLevelArray))
      $("#stockMin").text("Min Value: $"+Math.min(...stockLevelArray))
      // finding average
      // console.log("the min is " + Math.min(...stockLevelArray));
      var total= 0;
      var avg = 0;
      var innerSumUpper =0;
      for (i=0;i<stockLevelArray.length;i++){
        total += parseInt(stockLevelArray[i]);
      }
      // finding standard Deviation
      avg = Math.floor((total/stockLevelArray.length)*100)/100;
      $("#stockAvg").text("Average Value: $"+avg);
      for (i=0;i<stockLevelArray.length;i++){
        innerSumUpper+=(stockLevelArray[i]-avg)*(stockLevelArray[i]-avg);
         
      }
      
      $("#stockStd").text("Standard Deviation: $"+Math.floor(Math.sqrt(innerSumUpper/stockLevelArray.length)*100)/100)

      displayStockGraph(chartStockData);
    });
  }

  // covid API
  function covidAPI() {
    // api link, with endpoint of cases per day
    var settings = {
      url:
        "https://api.covid19api.com/total/country/united-states/status/confirmed?cases",
      method: "GET",
      timeout: 0,
    };
    var covidNums = [];
    $.ajax(settings).done(function (response) {
      // console.log(response);
      // pulls the amount of cases everyday for the last month
      function oneMonth() {
        var month = [];
        covidData = [];
        for (i = 1; i <= 30; i++) {
          month.push(response.length - i);
        }
        for (i = 0; i < month.length; i++) {
          covidData.push({
            t: moment(response[month[i]].Date),
            y: response[month[i]].Cases
          })
        }
        covidData = covidData.reverse();
        // console.log(covidData);
      }

      // pulls the amount of cases everyday for the last 3 months
      function threeMonths() {
        var three = [];
        covidData = [];
        for (i = 1; i <= 90; i++) {
          three.push(response.length - i);
        }
        for (i = 0; i < three.length; i++) {
          covidData.push({
            t: moment(response[three[i]].Date),
            y: response[three[i]].Cases
          })
        }
        covidData = covidData.reverse();
        // console.log(covidData);
      }

      // pulls the amount of cases everyday for the last 6 months
      function sixMonths() {
        var six = [];
        covidData = [];
        for (i = 1; i <= 180; i++) {
          six.push(response.length - i);
        }
        for (i = 0; i < six.length; i++) {
          covidData.push({
            t: moment(response[six[i]].Date),
            y: response[six[i]].Cases
          })
        }
        covidData = covidData.reverse();
        // console.log(covidData);
      }

      // pulls data for all days of corona, starting on Jan 22, 2020 (first case)
      function oneYear() {
        covidData = [];
        for (i = 0; i < response.length; i++) {
          covidData.push({
            t: moment(response[i].Date),
            y: response[i].Cases
          })
        }
        // console.log(covidData);
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

      displayCovidGraph(covidData);
      // covid Metrics
      for (i=0;i<covidData.length;i++){
        var newCaseNum = covidData[i].y;
        covidNums.push(newCaseNum);
        
      }
      // console.log(covidNums);
      // finding covid max
      $("#covidMax").text("Max Value: "+ commafy(Math.max(...covidNums)));
      // finding covid min
      $("#covidMin").text("Min Value: "+ commafy(Math.min(...covidNums)));
      // finding avg
      var total= 0;
      var avg = 0;
      var innerSumUpper =0;
      for (i=0;i<covidNums.length;i++){
        total += parseInt(covidNums[i]);
      }
      avg=Math.floor(total/covidNums.length);
      $("#covidAvg").text("Average Value: "+ commafy(avg));
      // finding standard Deviation
      for (i=0;i<covidNums.length;i++){
        innerSumUpper+=(covidNums[i]-avg)*(covidNums[i]-avg);
         
      }
      $("#covidStd").text("Standard Deviation: "+ commafy(Math.floor(Math.sqrt(innerSumUpper/covidNums.length)*100)/100))

    });
  }

  function commafy(num){
    num = Math.round(num).toString()
    for(var j = num.length -3; j > 0; j -= 3)
      num = num.substring(0,j) + "," + num.substring(j,num.length);
    return num;
  }

  var covidGraph;
  var stockGraph;

  //Display Covid Graph
  function displayCovidGraph(data) {

      if(covidGraph)
        covidGraph.destroy();

    covidGraph = new Chart($("#ctxOne"), {
      type: "line", 
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: "#00A90C60",
            borderColor: "#00A90C",
            borderWidth: 3,
          },
        ],
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks:{
            label: function(tooltipItem){
              return commafy(parseInt(tooltipItem.yLabel)) + " cases";
            },
            title: function(tooltipItems){
              var title = tooltipItems[0].xLabel;
              return title.replace("8:00:00 pm","");
            }
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "gray",
              },
              ticks: {
                fontColor: "whitesmoke",
                callback: function(value) {
                  var val = value.toString();
                  val = val.substring(0,2);
                  if(val[1] != undefined)
                    val = val[0] + "." + val[1];
                  return val;
                }
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  month: "MMM YYYY"
                  }
                },
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "whitesmoke",
              },
            },
          ],
        },
      },
    });
  }

  //Display Stock Graph
  function displayStockGraph(data) {

    if(stockGraph)
      stockGraph.destroy();

    stockGraph = new Chart($("#ctxTwo"), {
      type: "line", 
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: "#00A90C60",
            borderColor: "#00A90C",
            borderWidth: 3,
          },
        ],
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks:{
            label: function(tooltipItem){
              label = tooltipItem.yLabel + " USD";
              return label;
            }
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "gray",
              },
              ticks: {
                fontColor: "whitesmoke",
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  month: "MMM YYYY"
                  }
                },
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "whitesmoke",
              },
            },
          ],
        },
      },
    });
  }
});
