import { User } from "next-auth";
import { Gym } from "./Gym";

export interface Review {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    user: User;
    gymId: number;
    gym: Gym;
}