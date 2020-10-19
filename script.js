$(document).ready(function(){
  // JS Variables

  var stockLevel = "";
  var stockName = "";
  var timePeriod = "";

  // covid api data
  monthData = [];
  threeData = [];
  sixData = [];
  yearData = [];

  // stocks api data
  stocksData = [];


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
      stockAPI(stockName, timeReplace)
  })

  // modal
  $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })



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
    var localStocksData = [];
    for (i = 0; i < response.length; i++) {
      // console.log(response[i].date +" $"+ response[i].close);
      if (stockLevel === "Open") {
        localStocksData.push(response[i].open);
      } else if (stockLevel === "Closing") {
        localStocksData.push(response[i].close);
      } else if (stockLevel === "High") {
        localStocksData.push(response[i].high);
      }
    }
    stocksData.push(localStocksData);
    console.log(stocksData);
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

  $.ajax(settings).done(function (response) {
    // pulls the amount of cases everyday for the last month
    function oneMonth() {
      var month = [];
      var localMonthData = [];
      for (i = 1; i <= 30; i++) {
        month.push(response.length - i);
      }
      for (i = 0; i < month.length; i++) {
        localMonthData.push(response[month[i]].Cases);
      }
      monthData.push(localMonthData.reverse());
      console.log(monthData);
    }

    // pulls the amount of cases everyday for the last 3 months
    function threeMonths() {
      var three = [];
      var localThreeData = [];
      for (i = 1; i <= 90; i++) {
        three.push(response.length - i);
      }
      for (i = 0; i < three.length; i++) {
        localThreeData.push(response[three[i]].Cases);
      }
      threeData.push(localThreeData.reverse());
      console.log(threeData);
    }

    // pulls the amount of cases everyday for the last 6 months
    function sixMonths() {
      var six = [];
      var localSixData = [];
      for (i = 1; i <= 180; i++) {
        six.push(response.length - i);
      }
      for (i = 0; i < six.length; i++) {
        localSixData.push(response[six[i]].Cases);
      }
      sixData.push(localSixData.reverse());
      console.log(sixData);
    }

    // pulls data for all days of corona, starting on Jan 22, 2020 (first case)
    function oneYear() {
      var year = [];
      for (i = 0; i < response.length; i++) {
        year.push(response[i].Cases);
      }
      yearData.push(year);
      console.log(yearData);
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

// create graph
var ctxOne = $("#ctxOne");
var ctxTwo = $("#ctxTwo");

displayGraph([10, 9, 13, 4, 12, 13, 2, 18, 5, 10, 2, 6], ctxOne);
displayGraph([12, 19, 3, 5, 2, 3, 20, 33, 9, 10, 11, 12], ctxTwo);

function displayGraph(data, chartNumber) {
  var myChart = new Chart(chartNumber, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: data,
          backgroundColor: "#69ea85",
          borderColor: "#1abe3e",
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "gray",
            },
            ticks : {
              fontColor: "whitesmoke"
            }
          },
        ],
        xAxes: [
          {
            gridLines: {
                display: false
              },
            ticks : {
                fontColor: "whitesmoke"
              },
          },  
        ]
      },
    },
  });
}
});
