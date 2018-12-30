import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ImageComponent } from 'src/app/image-dialog/image.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  imagePreviews: string[] = [];
  files: File[] = [];
  @ViewChild('filePicker') filePicker;

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      'streetAddress': new FormControl(),
      'city': new FormControl(),
      'zipCode': new FormControl()
    });

    this.secondFormGroup = this._formBuilder.group({
      'homeSquareFeet': new FormControl(),
      'landSquareFeet': new FormControl(),
      'yearBuilt': new FormControl(),
      'propertyType': new FormControl(),
      'saleType': new FormControl(),
      'bathrooms': new FormControl(),
      'bedrooms': new FormControl(),
      'price': new FormControl(),
      'finishedBasement': new FormControl()
    });

    this.thirdFormGroup = this._formBuilder.group({
      'image': new FormControl()
    });
  }

  onImagesSelected(event: Event) {
    const files = Array.from((event.target as HTMLInputElement).files);
    files.forEach( (file) => {
      this.thirdFormGroup.patchValue({
        image: file
      });
      this.thirdFormGroup.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.files = this.files.concat(files);
        this.imagePreviews.push(reader.result.toString());
      };
      reader.readAsDataURL(file);
    });
    console.log(this.imagePreviews);
  }

  onImageRemoved(imageIndex: number) {
    this.files.splice(imageIndex, 1);
    this.imagePreviews.splice(imageIndex, 1);
  }

  onImageView(imageIndex: number) {
    this.dialog.open(ImageComponent, {data: {imageLink: this.imagePreviews[imageIndex]}});
  }
}
