import { Title } from '../../title/entity/title';

interface IJikanTitle {
    "image_url": string,
    "title": string,
    "synopsis": string,
    "episodes": number,
    "start_date": string,
    "mal_id": number,
}

export function fromApiResponseToEntity(data: IJikanTitle): Title {
    const {
        title: name,
        image_url: sourceImage,
        synopsis,
        episodes: episodeCount,
        mal_id: externalId,
    } = data;
    const premiereDate = new Date(data.start_date);

    return new Title({
        id: undefined,
        externalId,
        name,
        synopsis,
        episodeCount,
        seasonCount: undefined,
        sourceImage,
        premiereDate,
        trailerUrl: undefined
    });
}