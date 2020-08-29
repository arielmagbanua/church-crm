import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupsComponent } from './small-groups.component';

describe('SmallGroupsComponent', () => {
  let component: SmallGroupsComponent;
  let fixture: ComponentFixture<SmallGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
