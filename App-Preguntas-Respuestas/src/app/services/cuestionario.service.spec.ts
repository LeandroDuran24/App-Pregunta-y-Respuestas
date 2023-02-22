import { TestBed } from '@angular/core/testing';

import { CuestionarioService } from './cuestionario.service';

describe('CuestionarioService', () => {
  let service: CuestionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuestionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
