import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadExpertComponent } from './lead-expert.component';

describe('LeadExpertComponent', () => {
  let component: LeadExpertComponent;
  let fixture: ComponentFixture<LeadExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeadExpertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
