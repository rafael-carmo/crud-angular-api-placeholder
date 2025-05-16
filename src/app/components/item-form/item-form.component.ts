import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-item-form',
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogActions,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit{
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', item?: Item }
  ){}

  ngOnInit(): void {
    this.initForm();

    if (this.data.mode === 'edit' && this.data.item) {
      this.itemForm.patchValue(this.data.item);
    }
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      return;
    }

    const itemData: Item = this.itemForm.value;

    if (this.data.mode === 'add') {
      this.addItem(itemData);
    } else if (this.data.mode === 'edit' && this.data.item) {
      this.updateItem(this.data.item.id!, itemData);
    }
  }

  addItem(item: Item): void {
    this.itemService.create(item).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateItem(id: number, item: Item): void {
    this.itemService.update(id, item).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
