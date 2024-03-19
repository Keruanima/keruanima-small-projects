from flask import Flask, render_template, request, jsonify
from scrapper import extract_video_urls

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape')
def scrape():
    site_url = request.args.get('url')
    video_urls = extract_video_urls(site_url)
    return jsonify(video_urls)

if __name__ == '__main__':
    app.run(debug=True)
