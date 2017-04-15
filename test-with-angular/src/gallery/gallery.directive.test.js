/*

# karma.conf.js
    - Files the tests needs, for example angular, angular-mocks, and jquery
    - angular-mocks and jquery are not needed to run the application
    - log settings

# Jasmine API
    - describe blocks groups tests, can nest them
    - beforeEach run before each tests
    - it block are the tests
    - it blocks run in random order
    - it blocks and the beforeEach is the test setup
    - function scope apply

    - .toBe() vs toEqual()
        * for primitives, like strings and number, no difference
        * for objects, toBe() checks if it is the same object in memory, toEqual() checks if it has the same properties and values

*/

describe('The Gallery Component should show images and their caption', function () {

    var $scope;
    var $compile;
    var $q;
    var $interval;
    var galleryInfoService;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;

    beforeEach(angular.mock.module('templatecache'));
    beforeEach(angular.mock.module('main.gallery'));

    beforeEach(angular.mock.inject(function ($rootScope, _$compile_, _$q_, _$interval_, _galleryInfoService_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $q = _$q_;
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
            expect(jQelement.find('img').length).toBe(1);
            expect(jQelement.find('button').length).toBe(2);
        });

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
            vm = jQelement.isolateScope().vm;

            //We can mock different images if we want
            // vm.images = [
            //     {
            //         id: 1,
            //         src: 'mock-1.png',
            //         info: null
            //     },
            //     {
            //         id: 2,
            //         src: 'mock-2.png',
            //         info: null
            //     },
            //     {
            //         id: 3,
            //         src: 'mock-3.png',
            //         info: null
            //     }
            // ];

            // $scope.$digest();
        });

        it('starts with the first image and then shows next image when user clicks next button and prev image when user clicks prev button', function () {
            // start

            expect(vm.index).toBe(vm.firstImage);
            expect(jQelement.find('img').attr('src')).toContain('Untitled-1.png');

            // from start to next

            vm.next();
            $scope.$digest();

            expect(vm.index).toBe(1);
            expect(jQelement.find('img').attr('src')).toContain('Untitled-2.png');

            // from next to prev

            vm.prev();
            $scope.$digest();

            expect(vm.index).toBe(0);
            expect(jQelement.find('img').attr('src')).toContain('Untitled-1.png');
        });

        it('shows next image with an interval of 3 seconds', function () {
            // before interval, user was at index 1

            vm.index = 1;
            $scope.$digest();


            // interval

            $interval.flush(3000);
            $scope.$digest();

            expect(vm.index).toBe(2);
            expect(jQelement.find('img').attr('src')).toContain('Untitled-3.png');
        });

        it('styles the button based on index', function () {

            var $prevButton = jQelement.find('button.btn').eq(0);
            var $nextButton = jQelement.find('button.btn').eq(1);

            // starting on first image, when displayed prev button has class btn-warning, next button does not

            expect(vm.index).toBe(vm.firstImage);
            expect($prevButton.hasClass('btn-warning')).toBe(true);
            expect($nextButton.hasClass('btn-warning')).toBe(false);

            // when user is on last image, next button has class btn-warning, prev button does not

            vm.index = vm.lastImage;
            $scope.$digest();
            expect($prevButton.hasClass('btn-warning')).toBe(false);
            expect($nextButton.hasClass('btn-warning')).toBe(true);

            // when user is on neither first nor last image, neither button have class btn-warning
            
            vm.index = 1;
            $scope.$digest();
            expect($prevButton.hasClass('btn-warning')).toBe(false);
            expect($nextButton.hasClass('btn-warning')).toBe(false);
        });
    });


});
