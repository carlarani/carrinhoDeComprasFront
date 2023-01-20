import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComprasComponent } from './dialog-compras.component';

describe('DialogComprasComponent', () => {
  let component: DialogComprasComponent;
  let fixture: ComponentFixture<DialogComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
