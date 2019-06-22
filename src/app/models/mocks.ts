import { Subject } from 'rxjs';

import { ChatMessage } from './message';

export class WebSocketServiceMock {
    private webSocketUri: string = "";
    //SOCKET variable
    private socket: WebSocket;
    //Subject to send any realtime message
    public realTimeMessageSubject: Subject<ChatMessage> = new Subject();
    connectFn() { }
    onConnectionOpenFn(ev: Event) { }
    sendMessageFn(message: ChatMessage) { this.realTimeMessageSubject.next(); }
    onMessageFn(ev: any) { }
    validateAndEmitRealTimeMessageFn(message: ChatMessage) { }
    onErrorFn(ev) { }
    onCloseFn(ev) { }
    constructor(public indexedDbService: IndexedDBStorageServiceMock) { }
}

export class IndexedDBStorageServiceMock {
    private dbName: string = "";
    private dbStoreName: string = "";
    private dbIndex: string = "";
    private indexProp: string[] = [];
    private dbKeyPath: string = "";

    //Database object
    private database: IDBDatabase;

    //Object store object
    private objectStore: IDBObjectStore;

    //SUBJECT to emit ready state of db
    public dbReadyStateEmit: Subject<any> = new Subject<any>();

    //Subject to emit user messages
    public getUserMessagesSubject: Subject<Array<ChatMessage>> = new Subject();

    initializeFn() { }

    getTransactionFn() { }
    addDataToStorageFn(data: ChatMessage) { }

    retriveMessageByUserFn(useList: Array<number> = []) { }
    getRecordByIdFn(id: number) { }
}