import { configureDI } from '../config/di';
import { TitleModel } from '../module/title/model/titleModel';
import { SeasonModel } from '../module/season/module';
import { EpisodeModel } from '../module/episode/module';

require('dotenv').config();

const diContainer = configureDI();

const titleModel = diContainer.get<typeof TitleModel>('TitleModel');
const seasonModel = diContainer.get<typeof SeasonModel>('SeasonModel');
const episodeModel = diContainer.get<typeof EpisodeModel>('EpisodeModel');

titleModel
    .create({
        episodeCount: 26,
        id: undefined,
            externalId: 30,
        name: 'Neon Genesis Evangelion',
        premiereDate: new Date('Oct. 04, 1995'),
        seasonCount: 1,
        sourceImage:
            'https://animeflv1.com/wp-content/uploads/2020/04/lqqlHAmCk5jPjAjWKvZkJzmYdt1-185x278.jpg',
        synopsis:
            'En el año 1999, en la Antártida, ocurrió un cataclismo llamado “El Segundo Impacto”, como resultado de un incidente ocasionado por unos seres conocidos como “Ángeles”.',
        trailerUrl: 'https://www.youtube.com/watch?v=13nSISwxrY4&ab_channel=Netflix',
    })
    .then(() => {
        seasonModel
            .create({
                episodeCount: 26,
                id: undefined,
                name: 'Season 1',
                premiereDate: new Date('Oct. 04, 1995'),
                seasonNumber: 1,
                sourceImage:
                    'https://animeflv1.com/wp-content/uploads/2020/04/lqqlHAmCk5jPjAjWKvZkJzmYdt1-185x278.jpg',
                synopsis:
                    'En el año 1999, en la Antártida, ocurrió un cataclismo llamado “El Segundo Impacto”, como resultado de un incidente ocasionado por unos seres conocidos como “Ángeles”.',
                titleId: 1,
                trailerUrl: 'https://www.youtube.com/watch?v=13nSISwxrY4&ab_channel=Netflix',
            })
            .then(async () => {
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 1,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Angel Attack',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E01.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 2,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'The Beast',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E02.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 3,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'A Transfer',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E03.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 4,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Hedgehog\'s Dilemma',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E04.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 5,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Rei I',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E05.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 6,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Rei II',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E06.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 7,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'A Human Work',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E07.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 8,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Asuka Strikes!',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E08.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 9,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Both of You, Dance Like You Want to Win!',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E09.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 10,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Magma Diver',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E10.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 11,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'The Day Tokyo-3 Stood Still',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E11.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 12,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'She said, \'Don\'t make others suffer for your personal hatred.\'',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E12.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 13,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Lilliputian Hitcher',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E13.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 14,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Weaving a Story',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E14.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 15,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Those women longed for the touch of others\' lips, and thus invited their kisses.',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E15.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 16,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Splitting of the Breast',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E16.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 17,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Fourth Child',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E17.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 18,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Ambivalence',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E18.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 19,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Introjection',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E19.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 20,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'WEAVING A STORY 2: oral stage',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E20.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 21,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'He was aware that he was still a child.',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E21.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 22,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Don\'t Be.',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E22.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 23,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Rei III',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E23.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 24,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'The Beginning and the End, or \'Knockin\' on Heaven\'s Door\'',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E24.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 25,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Do you love me?',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E25.mp4',
                    });
                await episodeModel
                    .create({
                        description:
                            'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.',
                        episodeNumber: 26,
                        id: undefined,
                        introEndTime: 90,
                        introStartTime: 0,
                        length: 1401,
                        name: 'Take care of yourself.',
                        outroEndTime: 1385,
                        outroStartTime: 1320,
                        seasonId: 1,
                        sourcePath: 'https://cdn1.fastani.net/Evangelion/Neon Genesis Evangelion S01E26.mp4',
                    });
            });
    });

setTimeout(() => {
    for (let i = 0; i < 10; i++) {
        titleModel
            .create({
                episodeCount: 75,
                id: 0,
                    externalId: 16498,
                premiereDate: new Date('2013-04-07T00:00:00+00:00'),
                seasonCount: 4,
                sourceImage:
                    'https://cdn.myanimelist.net/images/anime/10/47347.jpg?s=29949c6e892df123f0b0563e836d3d98',
                trailerUrl: 'https://www.youtube.com/watch?v=ouoNWnBDBeU&ab_channel=AnaMartinez',
                name: 'Shingeki no Kyojin',
                synopsis:
                    'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly...',
            })
            .catch((error) => {
                console.log(error);
            });
    }
}, 5000);
