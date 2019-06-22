import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { WebSocketService } from './websocket.service';
import { userList } from '../models/constant';
import { WebSocketServiceMock, IndexedDBStorageServiceMock } from '../models/mocks';
import { IndexedDBStorageService } from './indexeddb.service';

describe('IndexedDB Service ', () => {

    let service: IndexedDBStorageService;


    beforeEach(() => TestBed.configureTestingModule({
        providers: [IndexedDBStorageService]
    }));

    it('should be created', () => {
        service = TestBed.get(IndexedDBStorageService);
        expect(service).toBeTruthy();
    });


});