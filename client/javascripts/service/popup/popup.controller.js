(function() {
    angular
        .module('app')
        .controller('PopupController', PopupController)


    PopupController.$inject = ['$scope', 'popupService'];

    function PopupController($scope, popupService) {
        var vm = this;
        vm.header = popupService.popup.popupHeader;
        vm.bodyTitle = popupService.popup.popupBodyTitle;
        vm.bodyContent = popupService.popup.popupBodyContent;
        vm.reasonBox = popupService.popup.reasonBox;
        vm.reason = '';
        vm.nameBtnOK = popupService.popup.nameBtnOK;
        vm.nameBtnCancel = popupService.popup.nameBtnCancel;
        vm.funcBtnOK = funcBtnOK;
        vm.funcBtnCancel = funcBtnCancel;


        $scope.$watch('vm.reason', function(value) {
            if (value) {
                popupService.popup.popupReasonContent = vm.reason;
            }
        })

        function funcBtnOK() {
            popupService.popup.funcBtnOK();
        }

        function funcBtnCancel() {
            popupService.closePopup();
        }

    }
})();
