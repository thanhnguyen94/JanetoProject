(function() {
  'use strict';

  angular
    .module('app')
    .directive('ttTable', tableDirective);

  function tableDirective(){
    // Usage: ...
    var directive = {
      restrict: 'AE',
      templateUrl: 'javascripts/directive/table/table.html',
      scope: {
        tableHeader:'=' ,
        tableBody: '=' ,
        amountRecord:'=',
        totalPages  :  '=' ,
        currentPage : '=' ,
        sortedColumnName :'=',
        ascendSort : '='  , // if(true) -> ascend sort ; if(false) --> descend sort
        actionEdit : '=' ,
        actionDelete : '=',
        customEditName: '=' ,
        customDeleteName: '=', 
        actionPageButton : '=' ,
        actionAmountOption : '='
      },
      link: link,
      controller: tableController,
      controllerAs : 'vm'
    };
    return directive;

    ////////////////////////////

    function link(scope, element, attrs){

    }


  }
  tableController.$inject = ['$scope'];
  function tableController($scope) {
    var vm = this ;
    vm.body =[] ;
    vm.header={} ;
    // amount record per page
    vm.amountRecord = '' ;
    vm.amountRecordArray = [ 10 , 20 ,30 ,40, 50] ;
    vm.actionAmountOption = ''; 
    //initilize variable for pagination
    vm.currentPage = '' ;
    vm.totalPages = '';
    vm.pagination = []  ;
    vm.activeItem = [] ;
    vm.activeItem[1] = 'active' ;
    vm.setCurrentPage = setCurrentPage ;
    vm.actionPageButton = [] ; 
    // action edit
     vm.actionEdit =[ ]  ;
    vm.customEditName = 'Edit'  ;
    // action delete
    vm.actionDelete = [ ] ;
    vm.customDeleteName = 'Delete' ;

    // initilize variable for sorting
    vm.activeSortSymbol = [] ;
    vm.ascend = true ;
    vm.sortedColumn = ''  ;
    vm.setActiveSymbol = setActiveSymbol ;

    // read header table data and body table data
    $scope.$watch( 'tableHeader' , function (value) {
        vm.header = value ;
    }) ;
    $scope.$watch( 'tableBody' , function (value) {
      if(value) {
        vm.body = convertObjectToArray(value) ;
      }
    });
    $scope.$watch('totalPages' , function(value) {
      if(value) {
        vm.totalPages = value ;
        for(var i = 1 ; i <= vm.totalPages ; i++) {
          vm.pagination.push(i) ;
        }
      }
    });
    $scope.$watch('amountRecord' , function (value) {
      if(value) {
        vm.amountRecord = value ;

      }
    }) ;
    /* paginatuion proccess HERE
    *
    * */
    $scope.$watch('currentPage' , function (value) {
      if(value) {
        vm.currentPage = value ;
        setCurrentPage(value) ;
      }
    }) ;
    $scope.$watch('actionPageButton' , function (value) {
      if(value) { 
        vm.actionPageButton = value ;
        console.log(value); 
      }
    })  ;


    /* Sorting process HERE
    *
    * */
    $scope.$watch('sortedColumnName'  , function (value) {
      if(value) {
        vm.sortedColumn = value ;
        vm.header.forEach(function (item , index ) {
          if(item == vm.sortedColumn ) {
            vm.activeSortSymbol[item] = true ;
          } else {
            vm.activeSortSymbol[item] = false ;
          }
        }) ;
      }
    }) ;

    $scope.$watch('ascendSort' , function (value) {
        if(value == false){
          vm.ascend = false ;
        } else {
          vm.ascend =  true  ;
        }

    }) ;
    $scope.$watch('actionEdit' , function(value) {
      if(value) {
        vm.actionEdit = value ;
      }
    }) ;
    $scope.$watch('actionDelete' , function(value) {
      if(value) {
        vm.actionDelete = value ;
      }
    }) ;
    $scope.$watch('customEditName' , function (value) {
      if(value)  {
        vm.customEditName = value ;
      }
    }) ;
    $scope.$watch('customDeleteName' , function (value) {
      if(value) {
        vm.customDeleteName = value ;
      }
    }) ;
    $scope.$watch('actionAmountOption' , function (value) {
        if(value) { 
            vm.actionAmountOption = value ; 
        }
    }) ; 


    function setCurrentPage(value) {
      vm.currentPage  = value ;
        for(var i = 1  ; i<= vm.totalPages ; i++) {
          if(i == value) {
            vm.activeItem[i] = 'active' ;
          } else {
            vm.activeItem[i] = '' ;
          }
        }
    }
    function setActiveSymbol(columnName) {
      if(columnName == vm.sortedColumn) { //// If click into present sorted column,
      //  change ascend to descend sort or change descend to ascend sort
        if(vm.ascend == true) {
          vm.ascend = false ;
          /*query data from datbase HERE
          *
          * */
        }else  {
          vm.ascend = true ;
          /*query from database HERE
           *
           * */
        }

      } else { //  If clicked column is not column,
        // enable clicked column  , disable other columns
        vm.sortedColumn = columnName ;
        vm.header.forEach(function (item , index ) {
          if(item == vm.sortedColumn ) {
            vm.activeSortSymbol[item] = true ;
          } else {
            vm.activeSortSymbol[item] = false ;
          }
        })
      }

    }
    function convertObjectToArray(obj) {
      var  convertArray = [];
      for( var i = 0 ; i <obj.length ; i++ ) {
        var j = 0 ;
        convertArray[i] = [] ;
        Object.getOwnPropertyNames(obj[i]).forEach ( function(val , idx , array) {
          convertArray[i][j] = obj[i][val] ;
          j++ ;
        }) ;
      }
      return convertArray ;
    }



  }
})();
