import { Episode } from '../entity/episode';
import { EpisodeModel } from '../model/episodeModel';

// @ts-expect-error
export const fromModelToEntity = (episodeModel: EpisodeModel): Episode => new Episode(episodeModel.toJSON());
