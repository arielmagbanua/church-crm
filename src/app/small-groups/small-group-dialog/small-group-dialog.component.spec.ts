import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupDialogComponent } from './small-group-dialog.component';

describe('SmallGroupDialogComponent', () => {
  let component: SmallGroupDialogComponent;
  let fixture: ComponentFixture<SmallGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
