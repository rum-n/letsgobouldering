import { Favourite } from "./Favourite";
import { Follow } from "./Follow";
import { Gym } from "./Gym";
import { Review } from "./Review";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    gyms: Gym[];
    reviews: Review[];
    follows: Follow[];
    favourites: Favourite[];
}