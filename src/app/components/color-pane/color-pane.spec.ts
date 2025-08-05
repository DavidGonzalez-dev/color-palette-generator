import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPane } from './color-pane';

describe('ColorPane', () => {
  let component: ColorPane;
  let fixture: ComponentFixture<ColorPane>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPane]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPane);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
