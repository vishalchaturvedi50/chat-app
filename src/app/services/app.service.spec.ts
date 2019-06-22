import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';



describe('App Servic ', () => {

    let service: AppService;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [AppService],
        imports: [HttpClientTestingModule]
    }));

    it('should be created', () => {
        service = TestBed.get(AppService);
        expect(service).toBeTruthy();
    });


    it('Should send a new message', () => {

    });


});