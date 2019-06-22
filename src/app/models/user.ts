
/* User class */
export class UserClass {
    public id;
    public userName;
    public labels;
}

/**
 * User change event names as Enum
 */
export enum UserChangeEnum {
    CurrentUser, CurrentChatUser
}