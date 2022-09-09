import { Category } from './../../models/Category';
import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';
import { Anime } from '../../models';
import { animeResourceOptions } from './anime';

export const adminJsResource:ResourceWithOptions[]=[
    {
        resource: Category,
        options: categoryResourceOptions
    },{
        resource: Anime,
        options:animeResourceOptions
    }
]