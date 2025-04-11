import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent {

  languages: Languages[] = [];

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    })
  }

  // Método mejorado para manejar niveles con minúsculas y sin espacios
  getLevelWidth(level: string | undefined): string {
    // Verifica si 'nivel' no está definido o está vacío
    if (!level) {
      return '0%';  // Si no hay valor, devolvemos una barra vacía
    }

    // Convertir el nivel a minúsculas y eliminar espacios extra
    const formattedLevel = level.trim().toLowerCase();

    // Compara el valor formateado con las opciones esperadas
    switch (formattedLevel) {
      case 'beginner':
        return '30%';  // Nivel básico
      case 'intermediate':
        return '60%';  // Nivel intermedio
      case 'advanced':
        return '100%'; // Nivel avanzado
      default:
        return '0%';   // Si el nivel no coincide con ninguno de los casos anteriores
    }
  }

}
