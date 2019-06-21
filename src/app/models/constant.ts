import { UserClass } from './user';

export const userList: Array<UserClass> = [
    { id: 1, userName: "Vishal Chat", labels: "Drummer | JS Enthusiast" },
    { id: 2, userName: "John Daisy", labels: "C# | C++ | Swimmer" },
    { id: 3, userName: "Rock ", labels: "Biker | F# | Python " },
    { id: 4, userName: "Larry Rock", labels: "Drummer | JS Enthusiast" },
    { id: 5, userName: "Olivia Larry", labels: "Drummer | JS Enthusiast" },
    { id: 6, userName: "Jessica Rohn", labels: "Drummer | JS Enthusiast" },
    { id: 7, userName: "Daisy Raly", labels: "Drummer | JS Enthusiast" },
    { id: 8, userName: "Angelina Ray", labels: "Drummer | JS Enthusiast" },
    { id: 9, userName: "Ray Sahq", labels: "Drummer | JS Enthusiast" },
    { id: 10, userName: "Daisy Raly", labels: "Drummer | JS Enthusiast" }
];

export function getimgPathFn(id: number) {
    return `./assets/user-icon/${id}.svg`;
};