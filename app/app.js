'use strict';

define([
	'angular',
	'angularRoute',
	'jquery',
	'bootstrap',
	'bootstrapUi','angularCountry'
], function (angular, angularRoute, $, payment, view2, angularCountry) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'ui.bootstrap', 'puigcerber.countryPicker'
	]).
		config(['$routeProvider', function ($routeProvider) {
			$routeProvider.
				otherwise({ redirectTo: '/' });
		}])
		.service('myPaymentService', ['$http', function ($http) {
			this.postPayment = function ($params) {
				return $http({
					headers: { 'Content-Type': 'application/json' },
					url: 'https://my-json-server.typicode.com/typicode/demo/posts',
					method: "POST",
					data: $params
				});
			};
		} ])
		.controller('MainCtrl', ['$scope','$uibModal', function PaymentCtrl($scope, $uibModal) {

			$scope.type = ['type1', 'type2'];
			$scope.today = new Date();

			$scope.animationsEnabled = true;

			$scope.open = function (type) {
				$scope.templateConfig = '';
				switch(type){
					case 'intPay' :
						$scope.templateConfig = 	"<div ng-include src=\"'paymentform/intPay.html'\"></div>";
						break;			

					case 'etisalat' :
						$scope.templateConfig = 	"<div ng-include src=\"'paymentform/etisalat.html'\"></div>";
						break;	

					case 'salik' :
						$scope.templateConfig = 	"<div ng-include src=\"'paymentform/salikRecharge.html'\"></div>";
						break;	

					case 'du' :
						$scope.templateConfig = 	"<div ng-include src=\"'paymentform/du.html'\"></div>";
						break;	
					}
			
				$scope.temp = type;
				
				var modalInstance = $uibModal.open({
					animation: $scope.animationsEnabled,
					template: $scope.templateConfig,
					controller: 'PaymentCtrl',
					resolve: {
						type: function () {
							return $scope.temp;
						}
						
					}
				});


				modalInstance.result.then(function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};
             

			$scope.toggleAnimation = function () {
				$scope.animationsEnabled = !$scope.animationsEnabled;
			};
		}])
		.controller('PaymentCtrl', function ($scope,$http, $window,myPaymentService, $q,  $uibModalInstance, type) {
			$scope.type = type;
			console.log(type);
			$scope.cancel = function () {
			  $uibModalInstance.dismiss('cancel');
			  				
			};
			
			$scope.payData = {
				firstname: '',
				account: null,
				amount: null,
				country : '',
				rechargeCard: null
			};
			
			$scope.msg = 'Your payment was processed successfully.';
            
            $scope.submit = function(){
               $scope.submitted = true;
             };
            

			$scope.sendData = function(msg){
				$("#ajax_loader").show();
				
				var paramsToPost = $scope.payData; 
				
					var deferred = $q.defer();
					deferred.notify();

					myPaymentService.postPayment(paramsToPost)
						.success(function(data) {
							$("#ajax_loader").hide();

							$window.alert(msg);
                         
                         	$uibModalInstance.dismiss('cancel');
                         	
							console.log(data);
							// call any function or show any modal
							deferred.resolve();
						})
						.error(function(err) {
							console.log(err);
							deferred.reject();
						});
				
					return deferred.promise;
			};

		  });
		
		
});
