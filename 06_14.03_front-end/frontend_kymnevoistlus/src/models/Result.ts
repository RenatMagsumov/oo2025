import { Athlete } from "./Athlete"

export type Result = 
{
    id: number,
    event: string,
    score: number,
    athletes: Athlete[]
    athlete: Athlete
}