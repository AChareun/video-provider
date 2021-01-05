/* eslint-disable max-classes-per-file */

const AbstractTitleRepository = require('../abstractTitleRepository');
const AbstractTitleRepositoryError = require('../error/abstractTitleRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('AbstractTitleRepository cannot be instantiated directly', () => {
    let repositoryInstance;
    try {
        repositoryInstance = new AbstractTitleRepository();
    } catch (error) {
        expect(error).toBeInstanceOf(AbstractTitleRepositoryError);
    } finally {
        expect(repositoryInstance).toBeUndefined();
    }
});

test('A concrete implementation of AbstractTitleRepository can be instantiated', () => {
    class ConcreteRepository extends AbstractTitleRepository {};
    const instanceOfConcrete = new ConcreteRepository();

    expect(instanceOfConcrete).toBeInstanceOf(AbstractTitleRepository);
    expect(instanceOfConcrete).toBeInstanceOf(ConcreteRepository);
});

test('Abstract methods throw an error when being called with no implementation', () => {
    class ConcreteRepository extends AbstractTitleRepository {};
    const instanceOfConcrete = new ConcreteRepository();

    expect(() => instanceOfConcrete.getPaginated()).rejects.toThrowError(MethodNotImplementedError);
    expect(() => instanceOfConcrete.searchBy()).rejects.toThrowError(MethodNotImplementedError);
    expect(() => instanceOfConcrete.getById()).rejects.toThrowError(MethodNotImplementedError);
});
