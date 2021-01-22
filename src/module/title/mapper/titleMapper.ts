import { Title } from '../entity/title';
import { TitleModel } from '../model/titleModel';

// @ts-ignore
export const fromModelToEntity = (titleModel: TitleModel): Title => new Title(titleModel.toJSON());
