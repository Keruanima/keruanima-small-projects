import csv

# Función para procesar el archivo CSV y calcular el tiempo por etiqueta
def procesar_csv(nombre_archivo):
    etiquetas = {}
    with open(nombre_archivo, newline='', encoding='utf-8') as archivo_csv:
        lector_csv = csv.DictReader(archivo_csv)
        for fila in lector_csv:
            duracion = fila['Duration'].split(':')
            horas = int(duracion[0])
            minutos = int(duracion[1])
            segundos = int(duracion[2])
            tiempo_total = horas * 3600 + minutos * 60 + segundos
            etiquetas_texto = fila['Tags'].split(',')
            for etiqueta in etiquetas_texto:
                etiqueta = etiqueta.strip()
                etiquetas[etiqueta] = etiquetas.get(etiqueta, 0) + tiempo_total
    return etiquetas

# Función para generar el HTML a partir de los datos procesados
def generar_html(etiquetas):
    html = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resumen de Tiempo por Etiqueta</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
    </head>
    <body>

    <table id="tablaResumen">
        <thead>
            <tr>
                <th>Etiqueta</th>
                <th>Tiempo Dedicado (HH:MM:SS)</th>
            </tr>
        </thead>
        <tbody>
    """
    total_segundos = sum(etiquetas.values())
    for etiqueta, tiempo_total in etiquetas.items():
        horas = tiempo_total // 3600
        minutos = (tiempo_total % 3600) // 60
        segundos = tiempo_total % 60
        tiempo_formateado = f"{horas}:{minutos:02d}:{segundos:02d}"
        html += f"<tr><td>{etiqueta}</td><td>{tiempo_formateado}</td></tr>"
    
    # Agregar fila con el sumatorio total
    horas_total = total_segundos // 3600
    minutos_total = (total_segundos % 3600) // 60
    segundos_total = total_segundos % 60
    tiempo_total_formateado = f"{horas_total}:{minutos_total:02d}:{segundos_total:02d}"
    html += f"<tr><td>Total</td><td>{tiempo_total_formateado}</td></tr>"
    
    html += """
        </tbody>
    </table>

    </body>
    </html>
    """
    return html

# Nombre del archivo CSV
nombre_archivo_csv = 'horas-mes.csv'

# Procesar el archivo CSV
etiquetas = procesar_csv(nombre_archivo_csv)

# Generar el HTML
html = generar_html(etiquetas)

# Escribir el HTML en un archivo
with open('resumen_tiempo.html', 'w', encoding='utf-8') as archivo_html:
    archivo_html.write(html)

print("Se ha generado el archivo HTML 'resumen_tiempo.html'.")
