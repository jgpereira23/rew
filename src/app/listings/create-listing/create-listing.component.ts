import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ImageComponent } from 'src/app/image-dialog/image.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  form: FormGroup;
  imagePreviews: string[] = [];
  files: File[] = [];
  @ViewChild('filePicker') filePicker;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'streetAddress': new FormControl(),
      'city': new FormControl(),
      'zipCode': new FormControl(),
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
  }

  onImagesSelected(event: Event) {
    const files = Array.from((event.target as HTMLInputElement).files);
    files.forEach( (file) => {
      this.form.patchValue({
        image: file
      });
      this.form.get('image').updateValueAndValidity();
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
