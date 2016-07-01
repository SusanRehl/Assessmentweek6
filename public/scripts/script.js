var myApp=angular.module( 'myApp', [] );

var allTheHeroes=[]; // creates array used in deleting individual records, matches ng-repeat param in index.html

myApp.controller( 'addController', [ '$scope', '$http', function( $scope, $http){

  $scope.addHero = function(){ // adds record on button click
    event.preventDefault();
    var objectToSend ={  // package object to send, with inputs
      alias: $scope.aliasBinder,  // reference these in html
      first_name: $scope.firstNameBinder,
      last_name: $scope.lastNameBinder,
      city: $scope.cityBinder,
      power_name: $scope.powerNameBinder
    }; // end object
    $http({  // sends object via POST
      method: 'POST',
      url: '/add',
      data: objectToSend
    }); // end post call
    $scope.aliasBinder =''; // clears input boxes
    $scope.firstNameBinder ='';
    $scope.lastNameBinder ='';
    $scope.cityBinder = "";
    $scope.powerNameBinder = "";
    console.log(objectToSend);
  }; // end addHero function
}]);  //end addController

myApp.controller( 'viewController', [ '$scope', '$http', function( $scope, $http){

  $scope.getHeroes = function(){  // gets current recordset upon page load
    $http({   // gets recordset via GET
      method: 'GET',
      url: '/viewHeroes',
    }).then( function( response ){  // success call - runs function with response parameter
      console.log(response);
      $scope.allTheHeroes = response.data;  // pulls the data from app.js and sets to allTheHeroes
    }, function myError( response ){
  console.log( response.statusText );
  }); // end error function
}; // end getHeroes function

  $scope.deleteHero = function(index){ // deletes hero on button click
    var heroToDelete = $scope.allTheHeroes[index];  // removes the hero from the Dom
    $scope.allTheHeroes.splice(index, 1);
    console.log(heroToDelete._id);
    var heroId = {id: heroToDelete._id};  // creating object with the db id to send to server
    $http({
      method: 'POST',
      url: '/deleteHero',
      data: heroId
    }); // end post
  }; // end deleteHero function
}]); // end viewController
