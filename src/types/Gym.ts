import { Follow } from "./Follow";
import { News } from "./News";
import { Review } from "./Review";
import { User } from "./User";

export interface Gym {
    id: number;
    name: string;
    address: string;
    country: string;
    description?: string;
    adminId?: number;
    admin?: User;
    reviews?: Review[];
    news?: News[];
    follows?: Follow[];
    image?: string;
}