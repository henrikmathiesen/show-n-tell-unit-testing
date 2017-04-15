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
    .controller('galleryController', function ($scope, $interval, galleryInfoService) {
        var vm = this;
        var interval;

        vm.index = 0;
        vm.images = [
            {
                id: 1,
                src: 'Untitled-1.png',
                info: null
            },
            {
                id: 2,
                src: 'Untitled-2.png',
                info: null
            },
            {
                id: 3,
                src: 'Untitled-3.png',
                info: null
            }
        ];

        vm.cancelInterval = function () {
            $interval.cancel(interval);
        };

        vm.firstImage = 0;
        vm.lastImage = vm.images.length - 1;

        vm.prev = function () {
            if (vm.index !== vm.firstImage) {
                vm.index--;
            }
            else {
                vm.index = vm.lastImage;
            }
        }

        vm.next = function (wasLoop) {
            if (vm.index !== vm.lastImage) {
                vm.index++;
            }
            else {
                vm.index = vm.firstImage;
            }
        };

        vm.getInfo = function () {
            var currentImageId = vm.images[vm.index].id;
            galleryInfoService.getInfo(currentImageId)
                .then(function (data) {
                    vm.images[vm.index].info = data;
                });
        };

        interval = $interval(vm.next, 3000);

        $scope.$on('$destroy', function () {
            // ensure that we always close any running intervals when a controller instance is un-loaded.
            vm.cancelInterval();
        });

    });
