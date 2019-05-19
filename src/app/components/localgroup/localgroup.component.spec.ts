import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalgroupComponent } from './localgroup.component';

describe('LocalgroupComponent', () => {
  let component: LocalgroupComponent;
  let fixture: ComponentFixture<LocalgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
