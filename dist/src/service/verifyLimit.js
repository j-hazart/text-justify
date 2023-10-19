"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [];
let currentDate = new Date().getDate();
function verifyRateLimit(req, res, next) {
    const token = req.token;
    const text = req.body;
    if (isDateChanged()) {
        currentDate = new Date().getDate();
        resetDailyLimits();
    }
    if (!isUserRegistered(token)) {
        addNewUser(token);
    }
    const currentUser = getCurrentUser(token);
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
function isUserRegistered(token) {
    return users.map((user) => user.token).includes(token);
}
function addNewUser(token) {
    const user = { token, wordsLimit: 80000 };
    users.push(user);
}
function wordsInText(text) {
    return text.split(" ").length;
}
function getCurrentUser(token) {
    return users.find((user) => user.token === token);
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
