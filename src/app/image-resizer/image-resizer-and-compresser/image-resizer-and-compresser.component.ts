import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-resizer-and-compresser',
  templateUrl: './image-resizer-and-compresser.component.html',
  styleUrls: ['./image-resizer-and-compresser.component.scss']
})
export class ImageResizerAndCompresserComponent implements OnInit {
  file?: File;
  form: FormGroup;
  originalImageRatio!: number;
  fileGenerationInProgress: boolean;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('previewImg') previewImg!: ElementRef<HTMLImageElement>;

  constructor() {
    this.fileGenerationInProgress = false;
    this.form = new FormGroup({
      width: new FormControl(null),
      height: new FormControl(null),
      maintainRatio: new FormControl(true),
      reduceQuality: new FormControl(false),
    });
  }

  ngOnInit(): void {
  }

  /**
   * Loads the selected file for resizing and compressing
   */
  loadFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
    if (!files || files.length == 0) {
      // this.previewImg.nativeElement.src = 'assets/upload-icon.svg';
      return; // return if user hasn't selected any file.
    }

    this.file = files[0];
    this.previewImg.nativeElement.src = URL.createObjectURL(this.file); // passing selected file url to preview img src
    this.originalImageRatio = this.previewImg.nativeElement.naturalWidth / this.previewImg.nativeElement.naturalHeight;
    this.setFormValues();

    // this.reset();
  }

  /**
   * Updates the height based on width.
   */
  onWidthUpdate() {
    // getting height according to the ratio checkbox status
    const height = (this.form.get('maintainRatio')?.value as boolean) ?
                      (this.form.get('width')?.value as number) / this.originalImageRatio :
                        (this.form.get('height')?.value as number);
    this.form.get('height')?.setValue(Math.floor(height) || null);
  }

  /**
   * Updates the width based on height.
   */
  onHeightUpdate() {
    // getting width according to the ratio checkbox status
    const width = (this.form.get('maintainRatio')?.value as boolean) ?
                      (this.form.get('height')?.value as number) / this.originalImageRatio :
                        (this.form.get('width')?.value as number);
    this.form.get('width')?.setValue(Math.floor(width) || null);
  }

  /**
   * Patches the form initial form value depending upon the image height an width.
   */
  setFormValues(): void {
    setTimeout(() => {
      this.form.patchValue({
        'width': this.previewImg.nativeElement.naturalWidth,
        'height': this.previewImg.nativeElement.naturalHeight,
        'maintainRatio': true,
        'reduceQuality': false,
      });
    }, 100); // added timeout for angular to detect change in image.
  }

  resizeAndDownload(): void {
    this.fileGenerationInProgress = true;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const link = document.createElement('a');

    // if quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total. you can pass from 0.1 - 1.0
    const imgQuality = (this.form.get('reduceQuality')?.value as boolean) ? 0.7 : 1.0;

    // setting canvas height and width according to the input values.
    canvas.width = (this.form.get('width')?.value as number) ?? 0;
    canvas.height = (this.form.get('height')?.value as number) ?? 0;

    setTimeout(() => {
      // drawing user selected image onto the canvas.
      context?.drawImage(this.previewImg.nativeElement, 0, 0, canvas.width, canvas.height);
      link.href = canvas.toDataURL('image/jpeg', imgQuality);
      // link.href = canvas.toDataURL(this.file?.type, imgQuality);
      link.download = `Converted_${this.file?.name.split('.')[0]}`; // adding converted as download value.
      link.click(); // clicking <a> element so the file download.

      this.fileGenerationInProgress = false;
    }, 500);
  }

  /**
   * Resets the file input field, in-order to do modification when user provides the same file again.
   */
  reset(): void {
    this.fileInput.nativeElement.value = '';
  }
}
