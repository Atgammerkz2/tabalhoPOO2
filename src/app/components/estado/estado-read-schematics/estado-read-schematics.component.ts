import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EstadoReadSchematicsDataSource, EstadoReadSchematicsItem } from './estado-read-schematics-datasource';
import { Estado } from '../estado.model';
import { EstadoService } from '../estado.service';

@Component({
  selector: 'app-estado-read-schematics',
  templateUrl: './estado-read-schematics.component.html',
  styleUrls: ['./estado-read-schematics.component.css']
})
export class EstadoReadSchematicsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EstadoReadSchematicsItem>;
  dataSource = new EstadoReadSchematicsDataSource();

  estados: Estado[] = [];
  displayedColumns = ['id', 'nome', 'sigla', 'action'];

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.estadoService.read().subscribe(estados => {
      this.estados = estados;
      //console.log(estados);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
