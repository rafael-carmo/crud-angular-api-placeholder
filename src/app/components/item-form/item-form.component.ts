import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { User } from '../../interfaces/user';

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
    // MatDialogTitle,
    MatDialogClose,
    MatIconModule,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit{
  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', item?: Item }
  ){}

  ngOnInit(): void {
    this.initForm();

    if (this.data.mode === 'edit' && this.data.item) {
      console.log('aqui')
      console.log(`item: ${this.data.item.user.id}`)
      this.itemForm.patchValue(this.data.item);
    }
  }

  initForm(): void {
    this.itemForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.min(3)]],
      description: [''],
      completed: [false],
      user: [this.data.item?.user]
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      return;
    }

    const itemData: Item = this.itemForm.value;
    const dados = this.itemForm.getRawValue();

    console.log(`itemDAta id: ${itemData.id}`);
    console.log(`dados: ${dados}`);

    if (this.data.mode === 'add') {
      //o usuário abaixo não precisaria ser criado quando tiver passando o token com o usuário logado.
      const user: User = {
        id: 1,
        email: '',
        password: ''
      }
      itemData.user = user;
      this.addItem(itemData);
    } else if (this.data.mode === 'edit' && this.data.item) {
      this.updateItem(this.data.item.id!, itemData);
    }
  }

  addItem(item: Item): void {
    //exemplo deepseek
    this.itemService.create(item).subscribe({
      next: () => {
        this.dialogRef.close({
          status: 201
        });
      },
      error: (err) => {
        this.dialogRef.close(err.error);
      }
    });

  }

  updateItem(id: number, item: Item): void {
    this.itemService.update(id, item).subscribe({
      next: () => {
        // this.dialogRef.close(true);
        this.dialogRef.close({
          status: 200
        });
      },
      error: (err) => {
        this.dialogRef.close(err.error);
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
