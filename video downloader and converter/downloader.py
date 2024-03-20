from pytube import YouTube

playlist_url = "https://www.youtube.com/playlist?list=PLfZURa0GCfYQBNJgqhcAmnkTzIbixP5FS"

# Extract videos from playlist
playlist = YouTube(playlist_url).extract_playlist()

for video in playlist:
  # Download each video
  video.download()
