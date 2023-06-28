import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslateService]
    });
    service = TestBed.inject(TranslateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve translation data', () => {
    const translationData = { greeting: 'Hola', goodbye: 'Adiós' };

    service.getData().then(() => {
      expect(service.getTranslate('greeting')).toEqual(translationData.greeting);
      expect(service.getTranslate('goodbye')).toEqual(translationData.goodbye);
    });

    const req = httpMock.expectOne(`assets/translations/${navigator.language}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(translationData);
  });
});
