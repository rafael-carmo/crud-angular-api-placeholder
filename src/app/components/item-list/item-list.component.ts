import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalViewItemComponent } from './modal-view-item/modal-view-item.component';

@Component({
  selector: 'app-item-list',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginator,
    MatPaginatorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'username', 'email', 'completed', 'actions'];
  dataSource: MatTableDataSource<Item>;
  dialogRef: any;

  length: number;
  pageIndex: number = 0;
  pageSize: number = 5;

  pageEvent: PageEvent;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems(this.pageSize, this.pageIndex);
  }

  loadItems(pageSize: number, pageIndex: number): void {
    this.itemService.getItems(pageSize, pageIndex).subscribe({
      next: (items) => {
        console.log(`items:`)
        console.log(items)
        this.dataSource = new MatTableDataSource<Item>(items.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.paginator._intl.itemsPerPageLabel="Itens por página";
        this.length = items.totalElements;
        this.pageIndex = 1;
      },
      error: (err) => {
        this.showError('Erro ao carregar itens');
        console.error(err);
      }
    });
  }

  // loadItems(): void {
  //   this.itemService.getItems().subscribe({
  //     next: (items) => {
  //       this.dataSource = new MatTableDataSource<Item>(items);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.paginator._intl.itemsPerPageLabel="Itens por página"
  //     },
  //     error: (err) => {
  //       this.showError('Erro ao carregar itens');
  //       console.error(err);
  //     }
  //   });
  // }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize; //elementos por pagina
    this.pageIndex = e.pageIndex; //pagina atual

    this.loadItems(this.pageSize, this.pageIndex);
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
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '700px',
      data: { mode: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.closeDialogSuccess('adicionado');
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
        this.closeDialogSuccess('atualizado');
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
        this.closeDialogSuccess('excluído');
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

  closeDialogSuccess(title: string): void {
    this.loadItems(this.pageSize, this.pageIndex);
    this.showSuccess(`Item ${title} com sucesso!`);
  }
}
