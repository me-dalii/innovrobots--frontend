import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeDetailsComponent } from './pe-details.component';

describe('PeDetailsComponent', () => {
  let component: PeDetailsComponent;
  let fixture: ComponentFixture<PeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
