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

        vm.index = 0;
        vm.images = [
            'Untitled-1.png',
            'Untitled-2.png',
            'Untitled-3.png'
        ];

        vm.firstImage = 0;
        vm.lastImage = vm.images.length - 1;

        vm.prev = function(){
            if(vm.index !== vm.firstImage) {
                vm.index--;
            }
            else {
                vm.index = vm.lastImage;
            }
        }

        vm.next = function () {
            if(vm.index !== vm.lastImage) {
                vm.index++;
            }
            else {
                vm.index = vm.firstImage;
            }
        };

    });
