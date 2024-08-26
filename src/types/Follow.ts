import { Gym } from "./Gym";
import { User } from "./User";

export interface Follow {
    id: number;
    userId: number;
    gymId: number;
    user: User;
    gym: Gym;
}