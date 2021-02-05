import { configureDI } from '../config/di';
import { TitleModel } from '../module/title/model/titleModel';
import { SeasonModel } from '../module/season/module';
import { EpisodeModel } from '../module/episode/module';

require('dotenv').config();

const diContainer = configureDI();

const titleModel = diContainer.get<typeof TitleModel>('TitleModel');
const seasonModel = diContainer.get<typeof SeasonModel>('SeasonModel');
const episodeModel = diContainer.get<typeof EpisodeModel>('EpisodeModel');


titleModel.create({
    episodeCount: 26,
    id: undefined,
    name: 'Neon Genesis Evangelion',
    premiereDate: new Date('Oct. 04, 1995'),
    seasonCount: 1,
    sourceImage: 'https://animeflv1.com/wp-content/uploads/2020/04/lqqlHAmCk5jPjAjWKvZkJzmYdt1-185x278.jpg',
    synopsis: 'En el año 1999, en la Antártida, ocurrió un cataclismo llamado “El Segundo Impacto”, como resultado de un incidente ocasionado por unos seres conocidos como “Ángeles”.',
    trailerUrl: 'https://www.youtube.com/watch?v=13nSISwxrY4&ab_channel=Netflix'
}).then(() => {
    seasonModel.create({
        episodeCount: 26,
        id: undefined,
        name: 'Season 1',
        premiereDate: new Date('Oct. 04, 1995'),
        seasonNumber: 1,
        sourceImage: 'https://animeflv1.com/wp-content/uploads/2020/04/lqqlHAmCk5jPjAjWKvZkJzmYdt1-185x278.jpg',
        synopsis: 'En el año 1999, en la Antártida, ocurrió un cataclismo llamado “El Segundo Impacto”, como resultado de un incidente ocasionado por unos seres conocidos como “Ángeles”.',
        titleId: 1,
        trailerUrl: 'https://www.youtube.com/watch?v=13nSISwxrY4&ab_channel=Netflix'
    }).then(() => {
        episodeModel.create({
            description: 'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
            episodeNumber: 1,
            id: undefined,
            introEndTime: 90,
            introStartTime: 0,
            length: 1401,
            name: 'Angel Attack',
            outroEndTime: 1385,
            outroStartTime: 1320,
            seasonId: 1,
            sourcePath: 'https://www.fembed.com/v/n04eda2rr53375w',
        }).catch((error) => {
            console.log(error);
        });
    })
})

setTimeout(() => {
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
}, 5000)
