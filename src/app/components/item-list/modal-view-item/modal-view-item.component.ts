import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../../interfaces/item';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-view-item',
  imports: [
    MatIconModule,
    MatIcon
  ],
  templateUrl: './modal-view-item.component.html',
  styleUrl: './modal-view-item.component.scss'
})
export class ModalViewItemComponent {

  itemData: Item;

  constructor(
    private dialogRef: MatDialogRef<ModalViewItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ){
    this.itemData = data;
  }

  closeModal() {
    this.dialogRef.close();
  }

}
