(function() {
    angular
        .module('app')
        .controller('InvitedSubjectController', InvitedSubjectController);

    InvitedSubjectController.$inject = ['$scope', 'subjectService', 'popupService'];

    /* @ngInject */
    function InvitedSubjectController($scope, subjectService, popupService) {
        var vm = this;
        vm.subjectData = {};
        vm.actionEdit = [];
        vm.actionDelete = [];
        vm.subjectData.header = ['ID', 'Name', 'Description'];

        subjectService.getSubject().success(function(data) {
            vm.subjectData.body = data;
            var obj = data;
            obj.forEach(function(currentValue) {
                var f = function() {
                    popupService.popup.reasonBox = false;
                    popupService.popup.popupBodyTitle = 'Information of Subject';
                    popupService.popup.popupBodyContent = currentValue;
                    popupService.showPopup();
                    popupService.popup.funcBtnOK = function() {
                        popupService.closePopup();
                    }
                }

                var g = function() {
                    popupService.popup.reasonBox = true;
                    popupService.popup.popupBodyTitle = 'Deny this Subject ?';
                    popupService.popup.popupBodyContent = currentValue;
                    popupService.showPopup();
                    popupService.popup.funcBtnOK = function() {
                        popupService.closePopup();
                    }
                }
                vm.actionEdit.push(f);
                vm.actionDelete.push(g);
            });

        })
        vm.subjectData.allowBtn = "Join";
        vm.subjectData.denyBtn = "Deny";

    }
})();
