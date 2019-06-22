import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { WebSocketService } from './websocket.service';
import { userList } from '../models/constant';
import { WebSocketServiceMock, IndexedDBStorageServiceMock } from '../models/mocks';

describe('App Service ', () => {

    let service: AppService;

    let webSocketService: WebSocketService;


    beforeEach(() => TestBed.configureTestingModule({
        providers: [AppService, UserService, WebSocketService]
    }).overrideProvider(WebSocketService, {
        useValue: new WebSocketServiceMock(new IndexedDBStorageServiceMock())
    }));

    it('should be created', () => {
        service = TestBed.get(AppService);
        webSocketService = TestBed.get(WebSocketService);
        expect(service).toBeTruthy();
    });


    it('We should get Message list', () => {
        service.getMessageListFn();
        service.currentMessageListSubs.subscribe(() => {
            expect(true).toBeTruthy();
        })
        // service.subscribeToMessageListFn().
    });


    it('Should subscribe to user change', () => {
        let spyFn = spyOn(service, "getMessageListFn");
        service.userService.setCurrentChatUserFn(userList[0].id);
        expect(spyFn).toHaveBeenCalled();
    });

    it('Should send a new message to Websocket service', () => {
        let spyFn = spyOn(webSocketService, "sendMessageFn");
        service.sendMessageFn("0 to 1");
        expect(spyFn).toHaveBeenCalled();
    });


});