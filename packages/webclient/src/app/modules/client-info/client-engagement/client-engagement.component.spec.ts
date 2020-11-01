import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEngagementComponent } from './client-engagement.component';

describe('ClientEngagementComponent', () => {
  let component: ClientEngagementComponent;
  let fixture: ComponentFixture<ClientEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
