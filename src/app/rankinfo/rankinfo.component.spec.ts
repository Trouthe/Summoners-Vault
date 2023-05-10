import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankinfoComponent } from './rankinfo.component';

describe('RankinfoComponent', () => {
  let component: RankinfoComponent;
  let fixture: ComponentFixture<RankinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
