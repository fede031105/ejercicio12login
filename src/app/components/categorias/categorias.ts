import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasService, Categoria } from '../../services/categorias';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html'
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaActual: Categoria = { nombre: '', descripcion: '' };
  editandoId: number | null = null;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriasService.obtenerTodas().subscribe({
      next: (data) => (this.categorias = data)
    });
  }

  guardarCategoria(): void {
    if (!this.categoriaActual.nombre) return;

    if (this.editandoId !== null) {
      this.categoriasService.actualizar(this.editandoId, this.categoriaActual).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarCategorias();
        }
      });
    } else {
      this.categoriasService.crear(this.categoriaActual).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarCategorias();
        }
      });
    }
  }

  editar(categoria: Categoria): void {
    this.editandoId = categoria.id ?? null;
    this.categoriaActual = { ...categoria };
  }

  eliminar(id?: number): void {
    if (!id) return;
    this.categoriasService.eliminar(id).subscribe({
      next: () => this.cargarCategorias()
    });
  }

  resetFormulario(): void {
    this.editandoId = null;
    this.categoriaActual = { nombre: '', descripcion: '' };
  }
}