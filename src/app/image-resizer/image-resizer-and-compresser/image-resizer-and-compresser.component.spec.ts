import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizerAndCompresserComponent } from './image-resizer-and-compresser.component';

describe('ImageResizerAndCompresserComponent', () => {
  let component: ImageResizerAndCompresserComponent;
  let fixture: ComponentFixture<ImageResizerAndCompresserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageResizerAndCompresserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResizerAndCompresserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
