fdescribe('The galleryInfo service fetches data from back end', function () {

    var $httpBackend;
    var $log;
    var galleryInfoService;
    var URLS_CONSTANT;

    beforeEach(angular.mock.module('templatecache'));
    beforeEach(angular.mock.module('main.shared'));     // need this module now since URLS_CONSTANT is in it
    beforeEach(angular.mock.module('main.gallery'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, _$log_, _galleryInfoService_, _URLS_CONSTANT_) {
        $httpBackend = _$httpBackend_;
        $log = _$log_;
        galleryInfoService = _galleryInfoService_;
        URLS_CONSTANT = _URLS_CONSTANT_;
    }));

    it('gets the response from back end, returning the data in it', function () {
        var mockData = { id: 1, body: 'mock ...' };
        $httpBackend.when('GET', URLS_CONSTANT.API + '/posts/1').respond(200, mockData);

        var serviceResponse = null;

        galleryInfoService.getInfo(1).then(function (data) {
            serviceResponse = data;
        });

        // this is needed to get the data actual mocked data
        $httpBackend.flush();

        // obs, toEqual (they are not the same object in memory, cant compare with toBe())
        expect(serviceResponse).toEqual(mockData);
    });

    it('handles 404 errors', function () {
        spyOn($log, 'error');

        $httpBackend.when('GET', URLS_CONSTANT.API + '/posts/1').respond(404);

        var serviceResponse = null;

        galleryInfoService.getInfo(1).then(function (data) {
            serviceResponse = data;
        });

        $httpBackend.flush();

        expect(serviceResponse).toBe(null);
        expect($log.error).toHaveBeenCalled();
    });

    it('handles 500 errors', function () {
        spyOn($log, 'error');

        $httpBackend.when('GET', URLS_CONSTANT.API + '/posts/1').respond(500);

        var serviceResponse = null;

        galleryInfoService.getInfo(1).then(function (data) {
            serviceResponse = data;
        });

        $httpBackend.flush();

        expect(serviceResponse).toBe(null);
        expect($log.error).toHaveBeenCalled();
    });

});
