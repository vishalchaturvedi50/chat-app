import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { WebSocketService } from './websocket.service';
import { userList, _chatEqualFn } from '../models/constant';
import { WebSocketServiceMock, IndexedDBStorageServiceMock } from '../models/mocks';
import { IndexedDBStorageService } from './indexeddb.service';
import { ChatMessage } from '../models/message';

describe('IndexedDB Service ', () => {

    let service: IndexedDBStorageService;


    beforeEach(() => TestBed.configureTestingModule({
        providers: [IndexedDBStorageService]
    }));

    it('should be created', () => {
        service = TestBed.get(IndexedDBStorageService);
        expect(service).toBeTruthy();
    });

    it('should have db instance and then send state through dbReadyStateEmit', () => {
        service.initializeFn();
        service.dbReadyStateEmit.next(() => {
            expect(true).toBeTruthy();
        })
    });

    it('should return a transaction', () => {
        service.initializeFn();
        service.dbReadyStateEmit.next(() => {
            expect(service.getTransactionFn()).not.toEqual(undefined);
        })
    });

    it('Add data to store and then retrive the same', () => {
        service.initializeFn();
        service.dbReadyStateEmit.next(() => {
            let message: ChatMessage = { from: 1, to: 2, message: "1 to 2", timeStamp: new Date() };
            service.addDataToStorageFn(message).onsuccess = (ev: any) => {
                let id = ev.target.result;
                message.id = id;
                service.getRecordByIdFn(id).onsuccess = (getev: any) => {
                    let obj = getev.target.result;
                    expect(_chatEqualFn(
                        JSON.parse(JSON.stringify(message)), obj)).toBeTruthy();
                }
            }
        })
    })

});