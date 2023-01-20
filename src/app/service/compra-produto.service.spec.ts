import { TestBed } from '@angular/core/testing';

import { CompraProdutoService } from './compra-produto.service';

describe('CompraProdutoService', () => {
  let service: CompraProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
