import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAccDetailsComponent } from './m-acc-details.component';

describe('MAccDetailsComponent', () => {
  let component: MAccDetailsComponent;
  let fixture: ComponentFixture<MAccDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAccDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAccDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
