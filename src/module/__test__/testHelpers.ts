import { Model } from 'sequelize';

export const insertModel = async <TCreationAttributes, Entity>(
    data: TCreationAttributes,
    model: typeof Model,
    callback: Function,
): Promise<Entity> => {
    // @ts-expect-error
    const newEntity = await model.create(data);
    return callback(newEntity);
};
