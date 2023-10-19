import { NextFunction, Request, Response } from "express";

type User = {
    token: string,
    wordsLimit: number
};

const users: User[] = [];

let currentDate: number = new Date().getDate();

function verifyRateLimit (req: Request, res: Response, next: NextFunction){
    const token: string = req.token;
    const text: string = req.body;

    if(isDateChanged()){
        currentDate = new Date().getDate();
        resetDailyLimits();
    }

    if(!isUserRegistered(token)){
        addNewUser(token);
    }
    
    const currentUser = getCurrentUser(token)

    if(currentUser){
        if(currentUser.wordsLimit >= wordsInText(text)){
            updateUserLimit(currentUser, text);
            next();
        } else {
            res.sendStatus(402);
        }
    }
};

function isUserRegistered(token: string): boolean{
    return users.map((user: User) => user.token).includes(token);
}

function addNewUser(token: string): void{
    const user: User = {token, wordsLimit: 80000};
    users.push(user);
}

function wordsInText(text: string): number{
    return text.split(" ").length;
}

function getCurrentUser(token: string): User | undefined{
    return users.find((user: User) => user.token === token);
}

function updateUserLimit(user: User, text: string): void{
    const userIndex: number = users.indexOf(user);
    users[userIndex].wordsLimit -= wordsInText(text);
}

function isDateChanged(): boolean{
    const today: number = new Date().getDate();
    return today !== currentDate;
}

function resetDailyLimits(): void{
    users.forEach((user: User) => {
        user.wordsLimit = 80000
    });
}

export default verifyRateLimit;