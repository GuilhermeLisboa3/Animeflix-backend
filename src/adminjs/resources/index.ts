import { Category } from './../../models/Category';
import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';

export const adminJsResource:ResourceWithOptions[]=[
    {
        resource: Category,
        options: categoryResourceOptions
    }
]