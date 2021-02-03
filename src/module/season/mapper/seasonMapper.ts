import { Season } from '../entity/season';
import { SeasonModel } from '../model/seasonModel';

// @ts-expect-error
export const fromModelToEntity = (seasonModel: SeasonModel): Season => new Season(seasonModel.toJSON());
