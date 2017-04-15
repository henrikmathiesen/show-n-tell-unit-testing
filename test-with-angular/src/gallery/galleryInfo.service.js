angular
    .module('main.gallery')
    .factory('galleryInfoService', function ($http, $q, $log, URLS_CONSTANT) {
        var factory = {};

        var onSuccess = function (response) {
            return response.data;
        };

        var onError = function () {
            $log.error('error in galleryInfoService')
            return $q.reject(); // prevents .then() in consumer to be called
        };

        factory.getInfo = function (id) {
            var url = URLS_CONSTANT.API + '/posts/' + id;
            return $http.get(url)
                .then(onSuccess)
                .catch(onError);
        };

        return factory;
    });
