import { TitleService } from '../titleService';

const repositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
};

const testService = new TitleService(repositoryMock);

test('TitleService method getPaginated should call correct TitleRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(repositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('TitleService method getById should call correct TitleRepository method ', () => {
    testService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
});
