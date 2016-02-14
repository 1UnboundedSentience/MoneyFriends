// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks

//= require morrisjs
//= require metisMenu
//= require datatables
//= require datatables-responsive
//= require flot
//= require flot.tooltip
//= require holderjs
//= require_tree .



//var apiRoute = "https://prod-api.level-labs.com/api/v2/core/" + specificRoute


var getAllTransactions = function() {
  new XMLHttpRequest();
  xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/get-all-transactions", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onloadend = function() {
      var parsed = JSON.parse(this.response);
      var jsonResponse = JSON.stringify(parsed, null, 2);
      console.log(jsonResponse);
      //document.getElementById('outrpc28').textContent = pretty;
  };
  xhr.onerror = function(err) {
      //document.getElementById('outrpc28').textContent = "ugh an error. i can't handle this right now.";
      console.log("Error occured.");
  };
  args = {"args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
  xhr.send(JSON.stringify(args));
}

var projectTransactions = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/projected-transactions-for-month", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onloadend = function() {
      var parsed = JSON.parse(this.response);
      var jsonResponse = JSON.stringify(parsed, null, 2);
      console.log(jsonResponse);
      // document.getElementById('outrpc29').textContent = pretty;
  };
  xhr.onerror = function(err) {
      console.log("Error occured.");
      // document.getElementById('outrpc29').textContent = "ugh an error. i can't handle this right now.";
  };
  args = {"args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}, "year":  2015, "month":  3};
  xhr.send(JSON.stringify(args));
}

var getHistoricalAndProjectedBalances = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/balances", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onloadend = function() {
      var parsed = JSON.parse(this.response);
      var jsonResponse = JSON.stringify(parsed, null, 2);
      console.log(jsonResponse);
      // document.getElementById('outrpc30').textContent = pretty;
  };
  xhr.onerror = function(err) {
      console.log("error occured");
      // document.getElementById('outrpc30').textContent = "ugh an error. i can't handle this right now.";
  };
  args = {"args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
  xhr.send(JSON.stringify(args));
}

var getAccounts = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/get-accounts", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onloadend = function() {
      var parsed = JSON.parse(this.response);
      var jsonResponse = JSON.stringify(parsed, null, 2);
      console.log(jsonResponse);
      // document.getElementById('outrpc30').textContent = pretty;
  };
  xhr.onerror = function(err) {
      console.log("error occured");
      // document.getElementById('outrpc30').textContent = "ugh an error. i can't handle this right now.";
  };
  args = {"args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
  xhr.send(JSON.stringify(args));
}

var aggregateTransaction = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/aggregate-transactions", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onloadend = function() {
      var parsed = JSON.parse(this.response);
      var jsonResponse = JSON.stringify(parsed, null, 2);
      console.log(jsonResponse);
      // document.getElementById('outrpc30').textContent = pretty;
  };
  xhr.onerror = function(err) {
      console.log("error occured");
      // document.getElementById('outrpc30').textContent = "ugh an error. i can't handle this right now.";
  };
  args = {"args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
  xhr.send(JSON.stringify(args));
}

var Login = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/login", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onloadend = function() {
      var parsed = JSON.parse(this.response);
      var jsonResponse = JSON.stringify(parsed, null, 2);
      console.log(jsonResponse);
      //document.getElementById('outrpc34').textContent = pretty;
  };
  xhr.onerror = function(err) {
      //document.getElementById('outrpc34').textContent = "ugh an error. i can't handle this right now.";
  };
  args = {"email":  "level@example.com", "password":  "incorrect_password", "args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
  xhr.send(JSON.stringify(args));
}
