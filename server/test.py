from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Folder to store uploaded files
UPLOAD_FOLDER = 'data'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if a file is part of the request
    if 'file' not in request.files:
        return jsonify({"status": "BAD", "message": "No file part"}), 400

    file = request.files['file']
    
    # Check if the file has a filename
    if file.filename == '':
        return jsonify({"status": "BAD", "message": "No selected file"}), 400

    try:
        # Save the file to the server
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        return jsonify({"status": "OK", "message": "File uploaded successfully"}), 200
    except Exception as e:
        return jsonify({"status": "BAD", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
