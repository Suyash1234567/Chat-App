import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwichatComponent } from './twichat.component';

describe('TwichatComponent', () => {
  let component: TwichatComponent;
  let fixture: ComponentFixture<TwichatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwichatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwichatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
