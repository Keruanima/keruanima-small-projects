import pytube
from pytube import YouTube
from tkinter import *

#playlist_url = "https://www.youtube.com/playlist?list=PLfZURa0GCfYQBNJgqhcAmnkTzIbixP5FS"

def descargar_video(url):
    try:
        if "playlist" in url:
            # Obtener la lista de reproducción desde la URL
            playlist = pytube.Playlist(url)
            for video in playlist.videos:
                video.streams.first().download()
                print(f"Descargando: {video.title}")
        else:
            # Descargar un solo video
            video = YouTube(url)
            video.streams.first().download()
            print("¡Descarga completada!")
    except Exception as e:
        print(f"Error: {e}")

ventana = Tk()
ventana.geometry("400x300")
ventana.title("Descargador de videos de YouTube")

etiqueta_url = Label(ventana, text="Introduce la URL del video o playlist:")
etiqueta_url.pack()
entrada_url = Entry(ventana)
entrada_url.pack()

boton_descargar = Button(ventana, text="Descargar", command=lambda: descargar_video(entrada_url.get()))
boton_descargar.pack()

ventana.mainloop()
