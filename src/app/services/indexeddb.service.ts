import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/message';
import { resolve } from 'q';
import { from, Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class IndexedDBStorageService {

    private dbName: string = "webChat";
    private dbStoreName: string = "webChatStore";
    private dbIndex: string = "userNameIndex";

    private database: IDBDatabase;

    private objectStore: IDBObjectStore;

    public getUserMessagesSubject: Subject<Array<ChatMessage>> = new Subject();

    constructor() {
        let db = window.indexedDB.open(this.dbName);
        db.onsuccess = (ev: any) => {
            console.log("SUCC")
            this.database = ev.target.result;
        }
        db.onupgradeneeded = (ev: any) => {
            console.log("ON UPGRADE");
            this.objectStore = this.database.createObjectStore(this.dbStoreName, {
                keyPath: "id", autoIncrement: true
            });
            this.objectStore.createIndex(this.dbIndex, ["from", "to"]);
        }
    }

    getTransactionFn() {
        return this.database.transaction(this.dbStoreName, "readwrite");
    }



    /**
     * Function to add data to storage
     * @param data  - Data in format of ChatMessage class
     */
    addDataToStorageFn(data: ChatMessage) {
        let transaction = this.getTransactionFn();
        return transaction.objectStore(this.dbStoreName).add(data);
    }

    retriveMessageByUserFn(fromName: string, toName: string) {
        let transaction = this.getTransactionFn();
        let listOfMessages: Array<ChatMessage> = [];
        let cursrc = transaction.objectStore(this.dbStoreName).openCursor();
        cursrc.onsuccess = (ev: any) => {
            let cursor: IDBCursor = ev.target.result;
            if (cursor) {
                let value: ChatMessage = (<any>cursor).value;
                if (value.from.toLowerCase() == fromName.toLowerCase()
                    && value.to.toLowerCase() == toName.toLowerCase()) {
                    listOfMessages.push(value);
                }
                cursor.continue();
            }
            else {
                this.getUserMessagesSubject.next(listOfMessages);
                transaction.abort();
            }
        }
    }


    deleteMessageFn(msgId: number) {
        this.getTransactionFn().objectStore(this.dbStoreName).delete(msgId);
    }

};