const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

test('AbstractController throws a specific error when being directly instantiated', () => {
    try {
        new AbstractController();
    } catch (error) {
        expect(error).toBeInstanceOf(AbstractControllerError);
    }
});

test('A class that inherits from AbstractController can be instantiated', () => {
    class ConcreteController extends AbstractController {};
    expect(new ConcreteController()).toBeInstanceOf(AbstractController);
});
