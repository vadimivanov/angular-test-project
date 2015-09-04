angular.module('phonecatApp', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'template/home.html',
                controller:'PhoneListCtrl'
            })
            .when('/about',{
                templateUrl:'template/about.html',
                controller:'AboutCtrl'
            })
            .when('/contact',{
                templateUrl:'template/contact.html',
                controller:'ContactCtrl'
            })
            .when('/phones/:phoneId', {
                templateUrl:'template/phone-detail.html',
                controller:'PhoneDetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .factory('Phone', function($resource) {
        return $resource('phones/:phoneId.:format', {
            phoneId: 'phones',
            format: 'json',
            apiKey: 'someKeyThis'
            /* http://localhost:8888/phones/phones.json?apiKey=someKeyThis */
        }, {
            // action: {method: <?>, params: <?>, isArray: <?>, ...}
            update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
        });
        //Phone.update(params, successcb, errorcb);
    })

    .controller('PhoneListCtrl', function($scope, $http, $location, Phone) {
        var phoneList = this;
        phoneList.title = "Phone catalog";
        phoneList.phones = [];
//        $http.get('phones/phones.json').
//            then(function(response) {
//                console.log('response11',response);
//                phoneList.phones = response.data;
//                console.log('phoneList.phones1',phoneList.phones);
//            }, function(response) {
//                console.log('response22',response);
//            });

            Phone.query({phoneId: 'phones'}, function(data) {
                phoneList.phones = data;
            });


    })
/* About Controller */
    .controller('AboutCtrl',
        function($scope, $http, $location) {
    })

/* Contact Controller */
    .controller('ContactCtrl',
        function($scope, $http, $location) {
    })

/* Phone Detail Controller */
    .controller('PhoneDetailCtrl',
        function($scope, $http, $location, $routeParams, Phone) {
            var phoneDetail = this;
            phoneDetail.phoneId = $routeParams.phoneId;
//            $http.get('phones/'+$routeParams.phoneId+'.json').
//                then(function(response) {
//                    phoneDetail.phone = response.data;
//                    phoneDetail.mainImageUrl = response.data.images[0];
//                    console.log('phoneDetail',phoneDetail.phone);
//                });
            Phone.get({phoneId: $routeParams.phoneId}, function(data) {
                phoneDetail.phone = data;
                phoneDetail.mainImageUrl = data.images[0];
                //data.$save();
            });

            phoneDetail.setImage = function(imageUrl) {
                phoneDetail.mainImageUrl = imageUrl;
            }

    });

