var app = angular.module("workedCalc", []);
app.controller("calcCtrl", function($scope) { 
  $scope.records = [[0, 0]];
   // localStorage.setItem("records", $scope.records);

  if(localStorage.getItem("rate") != null)
    $scope.rate = parseInt(localStorage.getItem("rate"));
  else
    $scope.rate = 0;

  if(localStorage.getItem("records") != null)
    $scope.records = JSON.parse(localStorage.getItem("records"));
  else
    $scope.records = [[0, 0]];

  $scope.removeCol = function(index) {
    $scope.records.splice(index, 1);

    if($scope.records.length <= 0)
      $scope.records = [[0, 0]];
  }

  $scope.changeRate = function() {
    localStorage.setItem("rate", $scope.rate);
  }

  $scope.changeValues = function() {
    localStorage.setItem("records", JSON.stringify($scope.records));
  }

  $scope.addCol = function() {
    $scope.records.push([0, 0]);
    $scope.changeValues();
  }

  $scope.clearAll = function() {
    if($scope.records.length > 1) {
      var conf = confirm('Are you sure?');
      if(conf) {
        $scope.records = [[0, 0]];
        $scope.changeValues();
      }
    }
  }

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

  $scope.getMoney = function() {
    var time = $scope.getTime();

    var money = time.h * $scope.rate;

    money += time.m * ($scope.rate / 60);

    return Math.round(money * 100) / 100;
  }
});
