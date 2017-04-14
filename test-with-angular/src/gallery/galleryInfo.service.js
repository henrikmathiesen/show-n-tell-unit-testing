angular
    .module('main.gallery')
    .factory('galleryInfoService', function ($http) {
        var factory = {};

        var root = 'http://jsonplaceholder.typicode.com';

        var onSuccess = function (response) {
            return response.data;
        };

        var onError = function () {
            console.error("Error galleryInfoService");
        };

        factory.getInfo = function (id) {
            var url = root + '/posts/' + id;
            return $http.get(url)
                .then(onSuccess)
                .catch(onError);
        };

        return factory;
    });
