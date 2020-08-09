import { UserClass } from './user';
import { ChatMessage } from './message';

/* Constant friend/user list */
export const userList: Array<UserClass> = [
    { id: 1, userName: "Vishal Chat", labels: "Drummer | JS Enthusiast" },
    { id: 2, userName: "John Anderson", labels: "Beer Brewing | Swimmer" },
    { id: 3, userName: "Jones Brown ", labels: "Biker | F# | Python " },
    { id: 4, userName: "Larry Rock", labels: "Cooking | Baseball" },
    { id: 5, userName: "Olivia Larry", labels: "Motorcycling | Cooking" },
    { id: 6, userName: "Jessica Martinez", labels: "Cricket | Biker" },
    { id: 7, userName: "Daisy Raly", labels: "Golfing | Basketball" },
    { id: 8, userName: "Angelina Ray", labels: "Carpentry | Dancing" },
    { id: 9, userName: "Ray Lopez", labels: "Investeing | Cricket" }
];

/* Function to get image path */
export function getimgPathFn(id: number) {
    return `./assets/user-icon/${id}.svg`;
};

/* INDEXEDDB Properties */
export const dbProperties = {
    dbName: "webChat",
    dbStoreName: "webChatStore",
    dbIndex: "userNameIndex",
    indexProp: ["from", "to"],
    keyPath: "id"
}
/* Websocket uri */
export const webSocketURi = "wss://connect.websocket.in/v3/99999999999999999999?apiKey=RpxHJwoUraof1EGm4tZQuak7g41LuJcgwjfEAGcyoN57VHLL1ANvrVhRs0dJ";


export function _chatEqualFn(object1: ChatMessage, object2: ChatMessage) {
    let isEqual = false;

    let object1Keys = Object.keys(object1);
    let object2Keys = Object.keys(object2);

    if (object1Keys.length == object2Keys.length) {
        let totalMatchValues = 0;
        for (let key of Object.keys(object1)) {
            if (object1[key] === object2[key])
                totalMatchValues++;
            else
                break;
        }
        isEqual = totalMatchValues == object1Keys.length;
    }
    return isEqual;
}

export const constantMessages = {
    offline: `You went offline! Check your connectivity.`,
    gettingConnected: `Searching the galaxy for you...`,
    iDbConnectionWait: `Relax while we load you your memories...`,
    pageReloadRequireed: `It's not you. It's us. Please reload.`
}