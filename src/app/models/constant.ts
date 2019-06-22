import { UserClass } from './user';

export const userList: Array<UserClass> = [
    { id: 1, userName: "Vishal Chat", labels: "Drummer | JS Enthusiast" },
    { id: 2, userName: "John Anderson", labels: "Beer Brewing | Swimmer" },
    { id: 3, userName: "JONES Brown ", labels: "Biker | F# | Python " },
    { id: 4, userName: "Larry Rock", labels: "Cooking | Baseball" },
    { id: 5, userName: "Olivia Larry", labels: "Motorcycling | Cooking" },
    { id: 6, userName: "Jessica Martinez", labels: "Cricket | Biker" },
    { id: 7, userName: "Daisy Raly", labels: "Golfing | Basketball" },
    { id: 8, userName: "Angelina Ray", labels: "Carpentry | Dancing" },
    { id: 9, userName: "Ray Lopez", labels: "Investeing | Cricket" },
    { id: 10, userName: "Daisy Raly", labels: "Golfing | Biker" }
];

export function getimgPathFn(id: number) {
    return `./assets/user-icon/${id}.svg`;
};

export const dbProperties = {
    dbName: "webChat",
    dbStoreName: "webChatStore",
    dbIndex: "userNameIndex",
    indexProp: ["from", "to"],
    keyPath: "id"
}

export const webSocketURi = "wss://connect.websocket.in/web-chat-app-xyz12";