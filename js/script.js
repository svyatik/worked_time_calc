var app = angular.module("workedCalc", []);
app.controller("calcCtrl", function($scope) { 
  $scope.records = [[0, 0]];

  // Get rate from localStorage
  if(localStorage.getItem("rate") != null)
    $scope.rate = parseInt(localStorage.getItem("rate"));
  else
    $scope.rate = 0;

  // Get table records from localStorage
  if(localStorage.getItem("records") != null)
    $scope.records = JSON.parse(localStorage.getItem("records"));
  else
    $scope.records = [[0, 0]];


  /**
   * Remove elect row
   * @param index index
   */
  $scope.removeCol = function(index) {
    $scope.records.splice(index, 1);

    if($scope.records.length <= 0)
      $scope.records = [[0, 0]];
  }


  /**
   * Setup file data after button clicked
   */
  $scope.saveToFile = function() {
    var time_string = '';
    for(var i = 0; i < $scope.records.length; i++) {
      time_string += i+1 + '. ' + $scope.records[i][0] + 'h ' + $scope.records[i][1] + 'm\r\n'
    }

    var data = getClearDate() + '           Worked Time Calculator\r\n' +
      '----------------------------------------------------\r\n \r\n' +
      time_string + '\r\n' +
      'Total Time: ' + $scope.getTime().h + 'h ' + $scope.getTime().m + 'm\r\n' +
      'Money Earned: $' + $scope.getMoney();
    var fileName = "Worked Time.txt";
    saveData(data, fileName);
  }


  /**
   * Return data in clear string format
   * @return string
   */
  function getClearDate() {
    var date = new Date();

    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();

    var hr = date.getHours();
    var mr = date.getMinutes();
    var sr = date.getSeconds();

    return(d+'.'+m+'.'+y+' '+hr+':'+mr+':'+sr);
  }


  /**
   * Save data to .txt file
   * @param  string data
   * @param  string fileName
   */
  function saveData(data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    blob = new Blob([data], {type: "octet/stream"}),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }


  /**
   * Save rate to local Storage
   */
  $scope.changeRate = function() {
    localStorage.setItem("rate", $scope.rate);
  }


  /**
   * Save input's data to local Storage
   */
  $scope.changeValues = function() {
    localStorage.setItem("records", JSON.stringify($scope.records));
  }


  /**
   * Add new table rows
   */
  $scope.addCol = function() {
    $scope.records.push([0, 0]);
    $scope.changeValues();
  }


  /**
   * Delete all table rows
   */
  $scope.clearAll = function() {
    if($scope.records.length > 1) {
      var conf = confirm('Are you sure?');
      if(conf) {
        $scope.records = [[0, 0]];
        $scope.changeValues();
      }
    }
  }


  /**
   * Count and return total time
   * @return object Get total hours and minutes
   */
  $scope.getTime = function() {
    var h = 0, m = 0;

    // Get time
    for(var i = 0; i < $scope.records.length; i++) {
      // get hours
      h += $scope.records[i][0]*1;

      // get minutes
      m += $scope.records[i][1]*1;
    }

    h += parseInt(m/60);
    m = m%60;

    return { h: h, m: m }
  }


  /**
   * Count and return total earned money
   * @return float Get total money based on time and rate
   */
  $scope.getMoney = function() {
    var time = $scope.getTime();

    var money = time.h * $scope.rate;

    money += time.m * ($scope.rate / 60);

    return Math.round(money * 100) / 100;
  }
});
