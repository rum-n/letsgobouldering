import { Gym } from "./Gym";

export interface News {
    id: number;
    title: string;
    content: string;
    gymId: number;
    createdAt: string;
    gym: Gym;
}