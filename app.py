import os
import uuid  # for generating unique identifiers
import time  # for timestamps (optional)
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

# Load YOLO model and classes
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

# Function to perform object detection on image
def detect_objects(image):
    (H, W) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    layer_outputs = net.forward(net.getUnconnectedOutLayersNames())
    boxes = []
    confidences = []
    class_ids = []

    for output in layer_outputs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and class_id == 2:  # Check if detected object is a car
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    detected_cars = []
    for i in range(len(boxes)):
        if i in indexes:
            detected_cars.append(boxes[i])

    return detected_cars

# Function to recognize vehicle types, draw rectangles, and count them
def recognize_and_count_vehicles(image):
    detected_cars = detect_objects(image)
    car_count = len(detected_cars)
    for car in detected_cars:
        x, y, w, h = car
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    return image, car_count

def process_image(image):
    # Convert image to OpenCV format
    nparr = np.frombuffer(image.read(), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Perform object detection and count vehicles
    processed_image, vehicle_count = recognize_and_count_vehicles(img)

    # Create the "processed_images" folder if it doesn't exist
    output_folder = 'processed_images'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Generate a unique filename using UUID
    unique_filename = f"{uuid.uuid4()}.jpg"  # Or f"{int(time.time())}.jpg" for timestamps
    output_path = os.path.join(output_folder, unique_filename)
    cv2.imwrite(output_path, processed_image)

    return {'count': vehicle_count}

@app.route('/process_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    result = process_image(image)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
