import { Athlete } from "./Athlete"

export type Result = 
{
    id: number,
    event: string,
    score: number,
    athlete: Athlete
}