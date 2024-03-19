import requests
from bs4 import BeautifulSoup

def extract_video_urls(url):
    video_urls = []
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        iframe_tags = soup.find_all('iframe')
        for iframe_tag in iframe_tags:
            video_url = iframe_tag['src']
            video_urls.append(video_url)
    except Exception as e:
        print("Error al extraer las URLs de video:", e)
    return video_urls

