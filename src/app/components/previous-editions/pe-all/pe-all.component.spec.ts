import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeAllComponent } from './pe-all.component';

describe('PeAllComponent', () => {
  let component: PeAllComponent;
  let fixture: ComponentFixture<PeAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
