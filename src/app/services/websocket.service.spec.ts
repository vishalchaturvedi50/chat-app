import { TestBed } from '@angular/core/testing';
import { WebSocketService } from './websocket.service';
import { IndexedDBStorageService } from './indexeddb.service';
import { IndexedDBStorageServiceMock } from '../models/mocks';
import { UserService } from './user.service';

describe('WebSocket Service ', () => {

    let service: WebSocketService;


    beforeEach(() => TestBed.configureTestingModule({
        providers: [WebSocketService, UserService, IndexedDBStorageService]
    }).overrideProvider(IndexedDBStorageService, { useValue: new IndexedDBStorageServiceMock() }));

    it('should be created', () => {
        service = TestBed.get(WebSocketService);
        expect(service).toBeTruthy();
    });

    it('On connection open should be called', () => {
        let spyFn = spyOn(service, "onConnectionOpenFn");
        service.connectFn();

        service.webSocketStateSubject.subscribe(state => {
            expect(state).toBe(WebSocket.OPEN);
        })
    })

    it('On connection close ', () => {
        let spyFn = spyOn(service, "onConnectionOpenFn");
        service.connectFn();

        service.webSocketStateSubject.subscribe(state => {
            if (state == WebSocket.OPEN) {
                service["socket"].close();
            }
            if (state == WebSocket.CLOSED) {
                expect(true).toBeTruthy();
            }
        })
    });

});