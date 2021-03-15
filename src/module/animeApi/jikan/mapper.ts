import { Title } from '../../title/entity/title';

interface IJikanTitle {
    "image_url": string,
    "title": string,
    "synopsis": string,
    "episodes": number,
    "start_date": string,
    "mal_id": number,
    "trailer_url"?: string | undefined,
    aired: {
        from: string
    }
}

export function fromApiResponseToEntity(data: IJikanTitle): Title {
    const {
        title: name,
        image_url: sourceImage,
        episodes: episodeCount,
        mal_id: externalId,
    } = data;

    const premiereDate = data?.start_date ? new Date(data.start_date) : data.aired.from ? new Date(data.aired.from) : undefined;
    const trailerUrl = data?.trailer_url;
    const synopsis = data?.synopsis.slice(0, 252) + '...';

    return new Title({
        id: undefined,
        externalId,
        name,
        synopsis,
        episodeCount,
        seasonCount: undefined,
        sourceImage,
        premiereDate,
        trailerUrl,
    });
}