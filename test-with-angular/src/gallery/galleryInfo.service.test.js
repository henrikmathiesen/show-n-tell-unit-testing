describe('The galleryInfo service fetches data from back end', function () {

    var $httpBackend;
    var galleryInfoService;
    var URLS_CONSTANT;

    beforeEach(angular.mock.module('templatecache'));
    beforeEach(angular.mock.module('main.gallery'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, _galleryInfoService_, _URLS_CONSTANT_) {
        $httpBackend = _$httpBackend_;
        galleryInfoService = _galleryInfoService_;
        URLS_CONSTANT = _URLS_CONSTANT_;
    }));

    it('', function () {

    });

});
