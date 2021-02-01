import { configureDI } from '../config/di';
import { TitleModel } from '../module/title/model/titleModel';

require('dotenv').config();

const diContainer = configureDI();

const titleModel = diContainer.get<typeof TitleModel>('TitleModel');

for (let i = 0; i < 10; i++) {
    titleModel.create({
        episodeCount: 75,
        id: 0,
        premiereDate: new Date('2013-04-07T00:00:00+00:00'),
        seasonCount: 4,
        sourceImage: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg?s=29949c6e892df123f0b0563e836d3d98',
        trailerUrl: 'https://www.youtube.com/watch?v=ouoNWnBDBeU&ab_channel=AnaMartinez',
        name: 'Shingeki no Kyojin',
        synopsis: 'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly...'
    })
        .catch((error) => {
            console.log(error);
        });
}
