// describe blocks groups tests, can nest them

describe('The Gallery Component should show images and their caption', function () {

    var $scope;
    var $compile;
    var $q;
    var $controller;
    var $interval;
    var galleryInfoService;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;

    // These runs before each test

    beforeEach(angular.mock.module('templatecache'));
    beforeEach(angular.mock.module('main.gallery'));

    beforeEach(angular.mock.inject(function ($rootScope, _$compile_, _$q_, _$controller_, _$interval_, _galleryInfoService_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $q = _$q_;
        $controller = _$controller_;
        $interval = _$interval_;
        galleryInfoService = _galleryInfoService_;

        directiveMarkup = '<gallery></gallery>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    describe('the template', function () {
        it('should be an image gallery, displaying an image with next and prev buttons', function () {
            console.log(html);

            expect(jQelement.find('img').length).toBe(1);
            expect(jQelement.find('button').length).toBe(2);
        });

        // it blocks run in random order, function scope apply

        it('should have the clickable buttons, for user to change to prev or next image', function () {
            expect(jQelement.find('button').eq(0).attr('ng-click')).toContain('vm.prev()');
            expect(jQelement.find('button').eq(1).attr('ng-click')).toContain('vm.next()');
        });

        it('should have the image clickable, for user to get the caption', function () {
            expect(jQelement.find('img').attr('ng-click')).toContain('vm.getInfo()');
        });

        it('should have a place to show the image caption; id and info', function () {
            expect(jQelement.find('div[ng-show="vm.images[vm.index].info"]').length).toBe(1);
        });
    });

    describe('the functionality', function () {
        var vm;

        beforeEach(function () {
            vm = $controller('galleryController');

            // We can mock different images if we want
            // var isolateScope = jQelement.isolateScope();
            // isolateScope.vm.images = [
            //     {
            //         id: 1,
            //         src: 'mock-1.png'
            //     },
            //     {
            //         id: 2,
            //         src: 'mock-2.png'
            //     },
            //     {
            //         id: 3,
            //         src: 'mock-3.png'
            //     }
            // ];

            // $scope.$apply();
        });

        it('starts with the first image', function () {
            expect(vm.index).toBe(0);
            expect(jQelement.find('img').attr('src')).toContain('Untitled-1.png');
        });
    });


});
