import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import { Item } from '../../interfaces/item';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from '../../services/item.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { ItemFormComponent } from '../item-form/item-form.component';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalViewItemComponent } from './modal-view-item/modal-view-item.component';

@Component({
  selector: 'app-item-list',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginator,
    MatChipsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'completed', 'actions'];
  dataSource: MatTableDataSource<Item>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.dataSource = new MatTableDataSource<Item>(items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Itens por página"
      },
      error: (err) => {
        this.showError('Erro ao carregar itens');
        console.error(err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openViewDialog(item: Item): void {
    const dialogRef = this.dialog.open(ModalViewItemComponent, {
      width: '700px',
      height: '330px',
      data: item
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.loadItems();
    //     this.showSuccess('Item adicionado com sucesso!');
    //   }
    // })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '700px',
      // height: '400px',
      data: { mode: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loadItems();
        this.showSuccess('Item adicionado com sucesso!');
      }
    })
  }

  openEditDialog(item: Item): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '600px',
      data: { mode: 'edit', item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loadItems();
        this.showSuccess('Item atualizado com sucesso!');
      }
    })
  }

  confirmDelete(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Deseja realmente excluir o item "${item.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(item.id!);
      }
    });
  }

  deleteItem(id: number): void {
    this.itemService.delete(id).subscribe({
      next: () => {
        this.loadItems();
        this.showSuccess('Item excluído com sucesso!');
      },
      error: (err) => {
        this.showError('Erro ao excluir item');
        console.error(err);
      }
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
