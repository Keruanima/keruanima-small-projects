import tkinter as tk
from yt_dlp import YoutubeDL

playlist_url = "https://www.youtube.com/playlist?list=PLfZURa0GCfYQBNJgqhcAmnkTzIbixP5FS"

ventana = tk.Tk()
ventana.title("Descargador de Videos")
ventana.geometry("400x200")

# Creación de widgets
etiqueta_url = tk.Label(text="URL del video o playlist:")
etiqueta_url.pack()

entrada_url = tk.Entry(width=50)
entrada_url.pack()

# Registrar la función actualizar_progreso en el evento de progreso de yt-dlp

boton_descargar = tk.Button(text="Descargar")
boton_descargar.pack()

def descargar_video():
    url = entrada_url.get()
    with YoutubeDL() as ydl:
        ydl.download([url])

boton_descargar.config(command=descargar_video)

ventana.mainloop()
