import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductosService, Producto } from '../../services/productos';
import { CategoriasService } from '../../services/categorias';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principal.html'
})
export class PrincipalComponent implements OnInit {
  totalProductos = 0;
  totalCategorias = 0;
  ultimosMovimientos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerTodos().subscribe({
      next: (data) => {
        this.totalProductos = data.length;
        this.ultimosMovimientos = data.slice(-5).reverse();
      }
    });

    this.categoriasService.obtenerTodas().subscribe({
      next: (data) => {
        this.totalCategorias = data.length;
      }
    });
  }
}