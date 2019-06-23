import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/message';
import { Subject } from 'rxjs';
import { dbProperties } from '../models/constant';
import { IDbReadyStateEnum } from '../models/indexedbstate';

@Injectable({
    providedIn: "root"
})
export class IndexedDBStorageService {

    /**
     * INDEX DB Properties
     */
    private dbName: string = dbProperties.dbName;
    private dbStoreName: string = dbProperties.dbStoreName;
    private dbIndex: string = dbProperties.dbIndex;
    private indexProp: string[] = dbProperties.indexProp;
    private dbKeyPath: string = dbProperties.keyPath;

    //Database object
    private database: IDBDatabase;

    //Object store object
    private objectStore: IDBObjectStore;

    //SUBJECT to emit ready state of db
    public dbReadyStateEmit: Subject<any> = new Subject<any>();

    //Subject to emit user messages
    public getUserMessagesSubject: Subject<Array<ChatMessage>> = new Subject();

    constructor() {
        this.initializeFn();
    }

    /* Initialize DB */
    initializeFn() {
        let db = indexedDB.open(this.dbName);
        //On Success of connection
        db.onsuccess = (ev: any) => {
            this.database = ev.target.result;
            this.dbReadyStateEmit.next(IDbReadyStateEnum.Ready);
        }

        db.onerror = () => {
            this.dbReadyStateEmit.next(IDbReadyStateEnum.Error);
        }

        //When DB is first time created the onupdateneeded is called
        db.onupgradeneeded = (ev: any) => {
            console.log("ON UPGRADE");
            //Assign data base variable
            this.database = ev.target.result;
            //Create object store
            this.objectStore = this.database.createObjectStore(this.dbStoreName, {
                keyPath: this.dbKeyPath, autoIncrement: true
            });
            //Create index
            this.objectStore.createIndex(this.dbIndex, this.indexProp);
        }

    }

    /**
     * Function to get transaction over DBStore
     */
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

    /**
     * Function to retrive message b/w two users
     * @param userList - List of user id's
     */
    retriveMessageByUserFn(userList: Array<number> = []) {
        //Get a transaction
        let transaction = this.getTransactionFn();
        //Create  a variable to hold list of meesages
        let listOfMessages: Array<ChatMessage> = [];
        //Get cursor
        let cursrc = transaction.objectStore(this.dbStoreName).openCursor();

        //On Cursor success
        cursrc.onsuccess = (ev: any) => {
            //each cursor item
            let cursor: IDBCursor = ev.target.result;
            if (cursor) {
                let value: ChatMessage = (<any>cursor).value;

                //Filter based on condition and push into array if condition is trye
                if (userList.indexOf(value.from) > -1 &&
                    userList.indexOf(value.to) > -1) {
                    listOfMessages.push(value);
                }
                //Continue to next cursor
                cursor.continue();
            }
            else {
                //Emit the messages
                this.getUserMessagesSubject.next(listOfMessages);
                //Abort the transaction
                transaction.abort();
            }
        }

        //ON ERROR SEND EMPTY MEssage LIST
        cursrc.onerror = () => {
            this.getUserMessagesSubject.next(listOfMessages);
        };
    }

    /* Get record by id  */
    getRecordByIdFn(id: number) {
        //Get a transaction
        let transaction = this.getTransactionFn();
        return transaction.objectStore(this.dbStoreName).get(id);
    }

    /**
     * Delete the messages 
     * @param msgId  - Unique index message id
     */
    deleteMessageFn(msgId: number) {
        this.getTransactionFn().objectStore(this.dbStoreName).delete(msgId);
    }

};