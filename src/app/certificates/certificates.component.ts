import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-certificates',
  standalone: false,
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

  certificates: certificates[] = [];

  constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
    })
  }

  normalizeUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    new URL(candidate);      // valida formato
    return candidate;
  } catch {
    return null;             // oculta el link si no es válida
  }
}

}
