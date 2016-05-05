(function() {
    angular
        .module('app')
        .controller('ApprovedSubjectController', ApprovedSubjectController);

    ApprovedSubjectController.$inject = ['$scope', 'subjectService', 'popupService'];

    /* @ngInject */
    function ApprovedSubjectController($scope, subjectService, popupService) {
        var vm = this;
        vm.subjectData = {};
        vm.actionEdit = [];
        vm.actionDelete = [];
        vm.subjectData.header = ['ID', 'Name', 'Description', 'Created by'];

        subjectService.getSubjectCreatedByTeacher().success(function(data) {
            // vm.subjectData.body = data.Data;
            var obj = data.Data;
            console.log(obj);
            var objBody = [];
            obj.forEach(function(currentValue) {               
                if (currentValue.Status == null && currentValue.Type == "create subject") {
                    var objValue = {};
                    var nameTeacher = currentValue.CreatedBy.LastName + " " + currentValue.CreatedBy.FirstName;
                    objValue.id = currentValue.Id;
                    objValue.Name = currentValue.Subject.Name;
                    objValue.Description = currentValue.Subject.Description;
                    objValue.CreatedBy = nameTeacher;
                    objBody.push(objValue);
                    var f = function() {
                        popupService.popup.reasonBox = false;
                        popupService.popup.popupBodyTitle = 'Information of Subject';
                        popupService.popup.popupBodyContent = objValue;
                        popupService.showPopup();
                        popupService.popup.funcBtnOK = function() {
                            currentValue.Status = 'approved';
                            currentValue.Comment = 'approved';
                            subjectService.approveSubject(currentValue);
                            popupService.closePopup();
                        }
                    }

                    var g = function() {
                        popupService.popup.reasonBox = true;
                        popupService.popup.popupBodyTitle = 'Deny this Subject ?';
                        popupService.popup.popupBodyContent = objValue;
                        popupService.showPopup();
                        popupService.popup.funcBtnOK = function() {
                            currentValue.Status = 'denied';
                            currentValue.Comment = popupService.popup.popupReasonContent;
                            subjectService.approveSubject(currentValue);
                            popupService.closePopup();
                        }
                    }
                    vm.actionEdit.push(f);
                    vm.actionDelete.push(g);
                }
            });
            vm.subjectData.body = objBody;
        })
        vm.subjectData.allowBtn = "Agree";
        vm.subjectData.denyBtn = "Deny";

    }
})();
