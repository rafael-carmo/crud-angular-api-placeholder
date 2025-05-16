import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewItemComponent } from './modal-view-item.component';

describe('ModalViewItemComponent', () => {
  let component: ModalViewItemComponent;
  let fixture: ComponentFixture<ModalViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
