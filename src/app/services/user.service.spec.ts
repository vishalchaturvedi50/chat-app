import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { userList } from '../models/constant';
import { UserClass } from '../models/user';


describe('User Service ', () => {

    let service: UserService;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [UserService],
        imports: [HttpClientTestingModule]
    }));

    it('should be created', () => {
        service = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });


    it('Should have first element of user list as current user', () => {
        expect(service.currentUser.id).toBe(userList[0].id);
    });

    it('Should have second element of user list as current chat user', () => {
        expect(service.currentChatUser.id).toBe(userList[1].id);
    });

    it('Should change current user', () => {
        service.setCurrentUserFn(userList[2].id);
        expect(service.currentUser.id).toBe(userList[2].id);
    });

    it('Should change current chat user', () => {
        service.setCurrentChatUserFn(userList[5].id);
        expect(service.currentChatUser.id).toBe(userList[5].id);
    });


    it('Should return me the user Vishal Chat', () => {
        let user = service.getUserByIdFn(userList[0].id);
        expect(user).toEqual(userList[0]);
    });

    it('Should get friend list without current user', () => {
        service.setCurrentChatUserFn(userList[0].id);
        let arr: Array<UserClass> = service.getFriendListFn();
        expect(arr).not.toEqual(jasmine.objectContaining(userList[0]));
    });

});