var app = angular.module("workedCalc", []);
app.controller("calcCtrl", function($scope) {
  $scope.records = [[0, 0]];

  $scope.removeCol = function(index) {
    $scope.records.splice(index, 1);

    if($scope.records.length <= 0)
      $scope.records = [[0, 0]];
  }

  $scope.addCol = function() {
    $scope.records.push([0, 0]);
  }

  $scope.clearAll = function() {
    if($scope.records.length > 1) {
      var conf = confirm('Are you shore?');
      if(conf)
        $scope.records = [[0, 0]];
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

    // return h + 'h ' + m + 'm';
    return { h: h, m: m }
  }

  $scope.getMoney = function() {
    var time = $scope.getTime();

    var money = time.h * $scope.rate;

    // var cent_per_minute = 9 / 60;
    money += time.m * ($scope.rate / 60);

    return Math.round(money * 100) / 100;
  }
});
