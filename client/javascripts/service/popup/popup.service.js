(function() {
    'use strict';

    angular
        .module('app')
        .factory('popupService', popupService);

    popupService.$inject = ['$http', '$modal'];

    function popupService($http, $modal) {
        var service = {
            showPopup: showPopup,
            closePopup: closePopup,
            popup: {
                popupHeader: 'Confirm',
                popupBodyTitle: 'Are you sure ?',
                popupBodyContent: null,

                // show or hide reason box
                reasonBox: false,
                
                popupReasonContent:'',

                nameBtnOK: 'OK',               
                nameBtnCancel: 'Cancel',
                funcBtnOK: null
            }
        };

        return service;

        ////////////////////////////

        var popup;

        function showPopup() {
            popup = $modal.open({
                animation: true,
                templateUrl: 'javascripts/service/popup/popup.html',
                controller: 'PopupController',
                controllerAs: 'vm',
            });
        }

        function closePopup() {
            popup.close();
        }

    }
})();
