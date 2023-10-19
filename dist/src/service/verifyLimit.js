"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [];
let currentDate = new Date().getDate();
function verifyRateLimit(req, res, next) {
    const email = req.payload.email;
    const text = req.body;
    if (isDateChanged()) {
        currentDate = new Date().getDate();
        resetDailyLimits();
    }
    if (!isUserRegistered(email)) {
        addNewUser(email);
    }
    const currentUser = getCurrentUser(email);
    if (currentUser) {
        if (currentUser.wordsLimit >= wordsInText(text)) {
            updateUserLimit(currentUser, text);
            next();
        }
        else {
            res.sendStatus(402);
        }
    }
}
;
function isUserRegistered(email) {
    return users.map((user) => user.email).includes(email);
}
function addNewUser(email) {
    const user = { email, wordsLimit: 80000 };
    users.push(user);
}
function wordsInText(text) {
    return text.split(" ").length;
}
function getCurrentUser(email) {
    return users.find((user) => user.email === email);
}
function updateUserLimit(user, text) {
    const userIndex = users.indexOf(user);
    users[userIndex].wordsLimit -= wordsInText(text);
}
function isDateChanged() {
    const today = new Date().getDate();
    return today !== currentDate;
}
function resetDailyLimits() {
    users.forEach((user) => {
        user.wordsLimit = 80000;
    });
}
exports.default = verifyRateLimit;
