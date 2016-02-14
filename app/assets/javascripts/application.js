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
//= require react
//= require react_ujs
//= require_tree .


table = false;
tableDom = false;

var apiRoute = "https://prod-api.level-labs.com/api/v2/core/"
$( document ).ready(function(){

  $('#transactions').click(function(e) {
    $('#tableTitle').text("Transactions");
    $('#tableDescription').text("See your transactions");
    getAllTransactions();
  })
  $('#accounts').click(function(e) {
    $('#tableTitle').text("Accounts");
    $('#tableDescription').text("See your accounts");
    getAccounts();
  })
  $('#projects').click(function(e) {
    $('#tableTitle').text("Projects");
    $('#tableDescription').text("See your projects");
    projectTransactions();
  })
  $('#balances').click(function(e) {
    $('#tableTitle').text("Balances");
    $('#tableDescription').text("See your balances");
    getHistoricalAndProjectedBalances();
  })
  $('#aggregate').click(function(e) {
    $('#tableTitle').text("Aggregate");
    $('#tableDescription').text("See your aggragation");
    aggregateTransaction();
  })



  $('#bankSubmit').click(function(e) {
    //debugger
    var transactionInfo = getAllTransactions();
    //debugger
  })

  var getAllTransactions = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://prod-api.level-labs.com/api/v2/core/get-all-transactions", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onloadend = function() {
        //debugger
        var parsed = JSON.parse(this.response);
        var userTransac = parsed['transactions'];
        //showTable(getColumns(userTransac), getData(userTransac));


        var columns = [];
        var datarows = [];
        var fixedColumns = [];
        var fixedData = [];
        fixedColumns = [
          { name: 'amount', title:'Amount' },
          //{ name: 'is-pending', title:'Status' },
          { name: 'aggregation-time', title:'Time' },
          //{ name: 'account-id', title:'Account' },
          { name: 'transaction-id', title:'Transaction ID' },
          { name: 'raw-merchant', title:'Merchant' }
        ];




        for(var i=0; i<userTransac.length; i++) {
          var row = [];
          var fixedRow = [];
          for( column in fixedColumns) {
            fixedRow.push (userTransac[i][fixedColumns[column].name]);
          }
          for( property in userTransac[i] ) {
            if(i==0) {
              columns.push({ title: property });
            } else {
              row.push(userTransac[i][property]);
            }
          }

          if(i>0){
            //fixedData.push(fixedRow);
            fixedData.push([
                userTransac[i]['amount'],
                //userTransac[i]['is-pending'],
                formatDate(userTransac[i]['aggregation-time']),
                //userTransac[i]['account-id'],
                userTransac[i]['transaction-id'],
                userTransac[i]['raw-merchant']
              ]
            );
            datarows.push(row);
          }
        }

        showTable(fixedColumns, fixedData);
    };
    xhr.onerror = function(err) {
        //document.getElementById('outrpc28').textContent = "ugh an error. i can't handle this right now.";
        console.log("Error occured.");
    };

    args = {"args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
    xhr.send(JSON.stringify(args));


  }

  // FETCH ALL COLUMNS
  var getColumns = function (data){
    var columns = [];
    for( property in data[0] ) {
      columns.push({ title: property });
    }
    return columns;
  }

  // FETCH ALL DATA
  var getData = function (data){
    var datarows = [];
    for(var i=0; i<data.length; i++) {
      var row = [];
      for( property in data[i] ) {
          row.push(data[i][property]);
      }
        datarows.push(row);
    }
    return datarows;
  }

  var formatAmount = function(amount){

  }
  var formatDate = function(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  var showTable = function(columns, datarows) {
    if (table == false) {
    } else {
      table.clear();
      table.destroy();
      tableDom.remove();
    }

    tableDom = $('#table').clone()
    tableDom = $('#table').after(tableDom);
    table = tableDom.DataTable({
      data: datarows,
      columns: columns,
      //responsive: true
    });

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

        var transactions = parsed['transactions'];
        showTable(getColumns(transactions), getData(transactions));
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

        var accounts = parsed['days'];
        showTable(getColumns(accounts), getData(accounts));
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

        var accounts = parsed['accounts'];
        showTable(getColumns(accounts), getData(accounts));

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
        var transactions = parsed['transactions'];
        showTable(getColumns(transactions), getData(transactions));

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
    args = {"email":  "jsnx21@gmail.com", "password":  "incorrect_password", "args": {"uid":  1110881160, "token":  "4A7C75C97619AAE75614834BBDE2DE2F", "api-token":  "HackathonAPITokenDevweek4222"}};
    xhr.send(JSON.stringify(args));
  }
})
