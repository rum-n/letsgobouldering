import { Gym } from "./Gym";
import { User } from "./User";

export interface Favourite {
    id: number;
    userId: number;
    gymId: number;
    user: User;
    gym: Gym;
}
