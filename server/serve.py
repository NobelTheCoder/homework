from flask import Flask, send_from_directory
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Path to the 'data' folder
data_folder = os.path.join(os.getcwd(), 'data')

@app.route('/<filename>')
def serve_file(filename):
    # Check if the 'data' folder exists
    if os.path.exists(data_folder):
        # Return the file from the 'data' folder if it exists
        if os.path.isfile(os.path.join(data_folder, filename)):
            return send_from_directory(data_folder, filename)
        else:
            return f"File '{filename}' not found.", 404
    else:
        return "Data folder not found.", 404

if __name__ == '__main__':
    app.run(debug=True, port=8000)


