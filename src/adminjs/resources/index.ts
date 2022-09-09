import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';
import { Anime, User, Episode, Category } from '../../models';
import { animeResourceOptions, animeResourceFeatures } from './anime';
import { episodeResourceFeatures, episodeResourceOptions } from './episodes';
import { userResourceOptions } from './user';

export const adminJsResource:ResourceWithOptions[]=[
    {
        resource: Category,
        options: categoryResourceOptions
    },{
        resource: Anime,
        options:animeResourceOptions,
        features: animeResourceFeatures
    },{
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },{
        resource: User,
        options: userResourceOptions
    }
]