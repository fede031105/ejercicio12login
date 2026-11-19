import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoActual: Producto = { nombre: '', descripcion: '', precio: 0 };
  editandoId: number | null = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerTodos().subscribe({
      next: (data) => (this.productos = data)
    });
  }

  guardarProducto(): void {
    if (!this.productoActual.nombre || this.productoActual.precio < 0) return;

    if (this.editandoId !== null) {
      this.productosService.actualizar(this.editandoId, this.productoActual).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarProductos();
        }
      });
    } else {
      this.productosService.crear(this.productoActual).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarProductos();
        }
      });
    }
  }

  editar(producto: Producto): void {
    this.editandoId = producto.id ?? null;
    this.productoActual = { ...producto };
  }

  eliminar(id?: number): void {
    if (!id) return;
    this.productosService.eliminar(id).subscribe({
      next: () => this.cargarProductos()
    });
  }

  resetFormulario(): void {
    this.editandoId = null;
    this.productoActual = { nombre: '', descripcion: '', precio: 0 };
  }
}