angular
    .module('main.gallery')
    .directive('gallery', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'gallery/gallery.template.html',
            controller: 'galleryController as vm',
            bindToController: true
        }
    })
    .controller('galleryController', function () {
        var vm = this;

        vm.foo = 'bar';
    });
