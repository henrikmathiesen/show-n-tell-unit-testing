describe('The Gallery Component should show images', function () {

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

    // it blocks (tests) are running in random order
    it('should render', function(){
        console.log("1");
    });

});
