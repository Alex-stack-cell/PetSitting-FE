import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPetSitterComponent } from './modal-pet-sitter.component';

describe('ModalPetSitterComponent', () => {
  let component: ModalPetSitterComponent;
  let fixture: ComponentFixture<ModalPetSitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPetSitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPetSitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
