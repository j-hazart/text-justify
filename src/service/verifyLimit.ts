import { NextFunction, Request, Response } from "express";

type User = {
    token: string,
    wordsLimit: number
};

const users: User[] = [];

let currentDate: number = new Date().getDate();

/**
 * The function verifies the rate limit for a user based on their token, checks if the current date has
 * changed, registers new users if necessary, and updates the user's limit if they have not exceeded
 * it.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the stack. It is typically used to move on to the next function in
 * the request-response cycle.
 */
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