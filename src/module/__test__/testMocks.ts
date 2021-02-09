import { Episode } from '../episode/entity/episode';
import { EpisodeCreationAttributes } from '../episode/model/episodeModel';
import { SeasonCreationAttributes } from '../season/model/seasonModel';
import { TitleCreationAttributes } from '../title/model/titleModel';
import { Season } from '../season/entity/season';
import { Title } from '../title/entity/title';

/**
 * EPISODE MOCKS
 */

export const episodeMock = new Episode({
    description: undefined,
    episodeNumber: 0,
    id: 0,
    introEndTime: undefined,
    introStartTime: undefined,
    length: undefined,
    name: undefined,
    outroEndTime: undefined,
    outroStartTime: undefined,
    seasonId: 0,
    sourcePath: undefined
});

export const fakeNewEpisode: EpisodeCreationAttributes = {
    description: 'Description',
    episodeNumber: 1,
    id: undefined,
    introEndTime: 120,
    introStartTime: 60,
    length: 620,
    name: 'Name',
    outroEndTime: 610,
    outroStartTime: 580,
    seasonId: 1,
    sourcePath: 'videoUrl',
};

export const episodeRepositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addEpisode: jest.fn(),
    getByNumber: jest.fn(),
};

export const episodeServiceMock = {
    episodeRepository: episodeRepositoryMock,
    getPaginated: jest.fn(() => Promise.resolve([episodeMock])),
    getById: jest.fn(() => Promise.resolve(episodeMock)),
    addEpisode: jest.fn(() => Promise.resolve(episodeMock)),
    getByNumber: jest.fn(() => Promise.resolve(episodeMock)),
};

/**
 * SEASON MOCKS
 */

export const seasonMock = new Season({
    episodeCount: 10,
    id: 1,
    name: 'Name',
    number: 1,
    premiereDate: new Date(),
    sourceImage: "ImgURL",
    synopsis: "Synopsis",
    titleId: 0,
    trailerUrl: "TrailerUrl"
});

export const fakeNewSeason: SeasonCreationAttributes = {
    episodeCount: 10,
    id: undefined,
    name: 'Season Name',
    premiereDate: new Date(),
    seasonNumber: 1,
    sourceImage: 'Source Image',
    synopsis: 'Synopsis',
    titleId: 1,
    trailerUrl: 'Trailer URL',
};

export const seasonRepositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addSeason: jest.fn(),
    getSeasonEpisodes: jest.fn(),
}

export const seasonServiceMock = {
    seasonRepository: seasonRepositoryMock,
    getPaginated: jest.fn(() => Promise.resolve([seasonMock])),
    getById: jest.fn(() => Promise.resolve(seasonMock)),
    addSeason: jest.fn(() => Promise.resolve(seasonMock)),
    getSeasonEpisodes: jest.fn(() => Promise.resolve([episodeMock])),
};


/**
 * TITLE MOCKS
 */

export const titleMock = new Title({
    id: 1,
    name: 'name',
    synopsis: 'synopsis',
    episodeCount: 1,
    seasonCount: 1,
    sourceImage: 'url',
    premiereDate: new Date(),
    trailerUrl: 'url',
});

export const fakeNewTitle: TitleCreationAttributes = {
    id: undefined,
    name: 'Title',
    synopsis: 'Synopsis',
    episodeCount: 10,
    seasonCount: 1,
    sourceImage: 'coverUrl',
    premiereDate: new Date(),
    trailerUrl: 'trailerUrl',
};

export const titleRepositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addTitle: jest.fn(),
    getTitleSeasons: jest.fn(),
}

export const titleServiceMock = {
    titleRepository: titleRepositoryMock,
    getPaginated: jest.fn(() => Promise.resolve([titleMock])),
    getById: jest.fn(() => Promise.resolve(titleMock)),
    addTitle: jest.fn(() => Promise.resolve(titleMock)),
    getTitleSeasons: jest.fn(() => Promise.resolve([seasonMock])),
};

/**
 * GENERAL MOCKS
 */

export const responseMock = {
    status: 'status',
    code: 322,
    message: 'message',
    data: null,
};

export const responseHelperMock = {
    apiErrors: [],
    buildOkResponse: jest.fn(() => responseMock),
    buildErrorResponse: jest.fn(() => responseMock),
};

export const resMock = (() => {
    const res = {
        status: function(){}, json: function(){},
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
})();