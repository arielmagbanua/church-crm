import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupListComponent } from './small-group-list.component';

describe('SmallGroupListComponent', () => {
  let component: SmallGroupListComponent;
  let fixture: ComponentFixture<SmallGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
