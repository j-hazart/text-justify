import { NextFunction, Request, Response } from "express";

type User = {
    email: string,
    wordsLimit: number
};

const users: User[] = [];

let currentDate: number = new Date().getDate();

function verifyRateLimit (req: Request, res: Response, next: NextFunction){
    const email: string = req.payload.email;
    const text: string = req.body;

    if(isDateChanged()){
        currentDate = new Date().getDate();
        resetDailyLimits();
    }

    if(!isUserRegistered(email)){
        addNewUser(email);
    }
    
    const currentUser = getCurrentUser(email)

    if(currentUser){
        if(currentUser.wordsLimit >= wordsInText(text)){
            updateUserLimit(currentUser, text);
            next();
        } else {
            res.sendStatus(402);
        }
    }
};

function isUserRegistered(email: string): boolean{
    return users.map((user: User) => user.email).includes(email);
}

function addNewUser(email: string): void{
    const user: User = {email, wordsLimit: 80000};
    users.push(user);
}

function wordsInText(text: string): number{
    return text.split(" ").length;
}

function getCurrentUser(email: string): User | undefined{
    return users.find((user: User) => user.email === email);
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