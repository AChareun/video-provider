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
    synopsis: 'En el año 1999, en la Antártida, ocurrió un cataclismo llamado “El Segundo Impacto”, como resultado de un incidente ocasionado por unos seres conocidos como “Ángeles”. Gran parte de la Tierra quedó devastada por el fenómeno, y la mitad de la población sucumbió en la catástrofe, aunque ahora la humanidad gradualmente se va recuperando. Años después, en el 2015, los “Ángeles” regresan y comienzan a atacar a la Tierra… Cada uno de los “Ángeles” es diferente de los demás, excepto por el hecho de que todos pueden generar un impenetrable escudo protector llamado Campo AT. La organización NERV revela su nuevo proyecto con miras a salvar el mundo: gigantes y bio-mecánicos robots conocidos como Evas, que son unos de las pocas fuerzas sobre la Tierra capaces de enfrentar a los “Ángeles”. Sólo niños específicos pueden pilotar los Evas: Shinji Ikari, el hijo de el jefe de NERV y que no desea pelear, la reservada Rei Ayanami y la exaltada (y algo amante del combate) Asuka Langley. Mientras combaten a los “Ángeles” uno a uno, van descubriendo más y más acerca de la naturaleza y el futuro de la humanidad…',
    trailerUrl: 'https://www.youtube.com/watch?v=13nSISwxrY4&ab_channel=Netflix'
}).catch((error) => {
    console.log(error);
});

seasonModel.create({
    episodeCount: 26,
    id: undefined,
    name: 'Season 1',
    premiereDate: new Date('Oct. 04, 1995'),
    seasonNumber: 1,
    sourceImage: 'https://animeflv1.com/wp-content/uploads/2020/04/lqqlHAmCk5jPjAjWKvZkJzmYdt1-185x278.jpg',
    synopsis: 'En el año 1999, en la Antártida, ocurrió un cataclismo llamado “El Segundo Impacto”, como resultado de un incidente ocasionado por unos seres conocidos como “Ángeles”. Gran parte de la Tierra quedó devastada por el fenómeno, y la mitad de la población sucumbió en la catástrofe, aunque ahora la humanidad gradualmente se va recuperando. Años después, en el 2015, los “Ángeles” regresan y comienzan a atacar a la Tierra… Cada uno de los “Ángeles” es diferente de los demás, excepto por el hecho de que todos pueden generar un impenetrable escudo protector llamado Campo AT. La organización NERV revela su nuevo proyecto con miras a salvar el mundo: gigantes y bio-mecánicos robots conocidos como Evas, que son unos de las pocas fuerzas sobre la Tierra capaces de enfrentar a los “Ángeles”. Sólo niños específicos pueden pilotar los Evas: Shinji Ikari, el hijo de el jefe de NERV y que no desea pelear, la reservada Rei Ayanami y la exaltada (y algo amante del combate) Asuka Langley. Mientras combaten a los “Ángeles” uno a uno, van descubriendo más y más acerca de la naturaleza y el futuro de la humanidad…',
    titleId: 1,
    trailerUrl: 'https://www.youtube.com/watch?v=13nSISwxrY4&ab_channel=Netflix'
}).catch((error) => {
    console.log(error);
});

episodeModel.create({
    description: 'In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race. To defend humanity against future Angel attacks, the United Nations established the NERV organization in Tokyo-3 to develop giant bio-mechanical mecha known as Evangelions. Fifteen years later, the Angels have finally returned, and the untested Evangelions can only be piloted by specially selected 14-year-olds. Shinji Ikari, estranged son of the director of NERV, Commander Gendo Ikari, arrives in Tokyo-3 and is dragooned into piloting Evangelion Unit 01 to fight the Angel, Sachiel, which is attacking the city.',
    episodeNumber: 1,
    id: undefined,
    introEndTime: 90,
    introStartTime: 0,
    length: 1401,
    name: 'Angel Attack',
    outroEndTime: 1385,
    outroStartTime: 1320,
    seasonId: 1,
    sourcePath: 'https://www207.ff-01.com/token=g2Ognf5GXEkkyCxYhRmMWQ/1612497112/190.138.0.0/94/2/f0/54b806e5ed1b9c27b21b633fd2483f02-720p.mp4',
}).catch((error) => {
    console.log(error);
});


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
