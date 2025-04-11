# Usa la imagen oficial de Apache
FROM httpd:2.4

# Copia los archivos generados al directorio público de Apache
COPY docs/browser /usr/local/apache2/htdocs/