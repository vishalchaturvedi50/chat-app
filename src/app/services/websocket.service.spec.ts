import { TestBed } from '@angular/core/testing';
import { WebSocketService } from './websocket.service';

describe('WebSocket Service ', () => {

    let service: WebSocketService;


    beforeEach(() => TestBed.configureTestingModule({
        providers: [WebSocketService]
    }));

    it('should be created', () => {
        service = TestBed.get(WebSocketService);
        expect(service).toBeTruthy();
    });



});