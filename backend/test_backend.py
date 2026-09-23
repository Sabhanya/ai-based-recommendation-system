"""
Croply AI / RythuMitra AI - Automated Backend & ML Validation Suite
Tests:
1. Root Endpoint & Offline Model Load Status
2. Tabular ML Model Info & Accuracy
3. Manual Soil/Weather Recommendations (Rice, Cotton) with 7 Parameters & Why This Crop?
4. Strict Non-Crop / Document / Noise Rejection (HTTP 422 with status="invalid")
5. Botanical Deep Vision Inference on Target Crops (Tomato, Jasmine, Rice, Cotton, etc.)
6. Strict Filename Invariance (Rename Tests: abc123.jpg -> Tomato, random123.jpg -> Jasmine)
"""

import os
import io
import sys
from PIL import Image
import numpy as np
from fastapi.testclient import TestClient
from main import app

sys.stdout.reconfigure(encoding="utf-8")
client = TestClient(app)


def test_api():
    print("=== Testing Croply AI Backend API & Deep Vision Model ===")

    # 1. Health Check
    res_root = client.get("/")
    print(f"1. Root Endpoint Status: {res_root.status_code}, vision_loaded: {res_root.json().get('vision_loaded')}")
    assert res_root.status_code == 200
    assert res_root.json().get("vision_loaded") is True

    # 2. Tabular ML Model Info
    res_info = client.get("/api/model-info")
    info_data = res_info.json()
    print(f"2. Tabular Model Info: Type: {info_data.get('model_type')}, Test Acc: {info_data.get('test_accuracy')*100:.2f}%")
    assert res_info.status_code == 200

    # 3. Manual Workflow: Predict Rice Soil/Weather Input (N=80, P=45, K=40, pH=6.5, temp=25, hum=80, rain=200)
    rice_input = {
        "nitrogen": 80, "phosphorus": 45, "potassium": 40, "ph": 6.5,
        "temperature": 25, "humidity": 80, "rainfall": 200
    }
    res_pred = client.post("/api/recommend-crops", json=rice_input)
    assert res_pred.status_code == 200
    pred_data = res_pred.json()
    print(f"3. Manual Predict Rice status: {pred_data.get('status')}")
    recs = pred_data.get("recommendations", [])
    assert len(recs) == 3
    for rec in recs:
        print(f"   Rank #{rec['rank']}: {rec['name']} ({rec['nameTe']}) -> Score: {rec['scorePercent']}")
    assert recs[0]["cropId"] == "rice"
    assert len(recs[0]["breakdown"]) == 6

    # 4. Manual Workflow: Predict Cotton Soil/Weather Input (N=120, P=45, K=20, pH=6.9, temp=25, hum=80, rain=80)
    cotton_input = {
        "nitrogen": 120, "phosphorus": 45, "potassium": 20, "ph": 6.9,
        "temperature": 25, "humidity": 80, "rainfall": 80
    }
    res_cotton = client.post("/api/recommend", json=cotton_input)
    assert res_cotton.status_code == 200
    cotton_data = res_cotton.json()
    print(f"4. Manual Predict Cotton status: {cotton_data.get('status')}")
    assert cotton_data["recommendations"][0]["cropId"] == "cotton"

    # 5. Image Workflow: Strict Non-Crop / Document / Noise Rejection (HTTP 422)
    # A. Blank White
    blank = Image.new("RGB", (200, 200), (255, 255, 255))
    buf_blank = io.BytesIO()
    blank.save(buf_blank, format="JPEG")
    res_blank = client.post(
        "/api/identify-crop",
        files={"file": ("blank.jpg", buf_blank.getvalue(), "image/jpeg")}
    )
    print(f"5a. Blank Image Rejection: status_code={res_blank.status_code}")
    assert res_blank.status_code == 422
    assert res_blank.json()["detail"]["status"] == "invalid"

    # B. Pure Noise
    noise_img = Image.fromarray(np.random.randint(0, 255, (224, 224, 3), dtype="uint8"))
    buf_noise = io.BytesIO()
    noise_img.save(buf_noise, format="JPEG")
    res_noise = client.post(
        "/api/identify-crop",
        files={"file": ("noise.jpg", buf_noise.getvalue(), "image/jpeg")}
    )
    print(f"5b. Random Noise Rejection: status_code={res_noise.status_code}")
    assert res_noise.status_code == 422
    assert res_noise.json()["detail"]["status"] == "invalid"

    # 6. Real Botanical Vision Inference on Target Crops
    test_base = os.path.join(os.path.dirname(__file__), "image_dataset", "test")
    test_crops = [
        ("tomato", "Tomato"),
        ("rice", "Rice (Paddy)"),
        ("maize", "Maize (Corn)"),
        ("cotton", "Cotton"),
        ("potato", "Potato"),
        ("wheat", "Wheat"),
        ("groundnut", "Groundnut (Peanut)"),
        ("chilli", "Chilli"),
        ("jasmine", "Jasmine")
    ]

    print("\n6. Running Deep Learning Inference on Target Crop Test Images:")
    for crop_id, expected_name in test_crops:
        img_path = os.path.join(test_base, crop_id, f"{crop_id}_001.jpg")
        if os.path.exists(img_path):
            with open(img_path, "rb") as f:
                img_bytes = f.read()
            res_img = client.post(
                "/api/identify-crop",
                files={"file": (f"test_{crop_id}.jpg", img_bytes, "image/jpeg")}
            )
            assert res_img.status_code == 200
            data = res_img.json()
            print(f"   Image [{crop_id.upper()}] -> Status: {data.get('status')} | Predicted: {data.get('crop')} ({data.get('cropTe')}) | Conf: {data.get('confidencePercent')}")
            assert data["status"] == "success"
            assert data["cropId"] == crop_id
            assert "agronomic" in data
            assert "N" in data["agronomic"]

    # 7. Filename Invariance (Rename Tests)
    print("\n7. Running Filename Invariance Tests (Filename does NOT dictate prediction):")
    rename_tests = [
        ("tomato", "abc123.jpg", "tomato"),
        ("jasmine", "random123.jpg", "jasmine"),
        ("rice", "plant.jpg", "rice"),
        ("potato", "image001.jpg", "potato")
    ]
    for orig_crop, fake_name, expected_id in rename_tests:
        img_path = os.path.join(test_base, orig_crop, f"{orig_crop}_001.jpg")
        with open(img_path, "rb") as f:
            bytes_data = f.read()
        res_rename = client.post(
            "/api/identify-crop",
            files={"file": (fake_name, bytes_data, "image/jpeg")}
        )
        assert res_rename.status_code == 200
        data = res_rename.json()
        print(f"   Renamed [{orig_crop}_001.jpg] -> [{fake_name}]: Predicted: {data.get('crop')} (ID: {data.get('cropId')}) | Conf: {data.get('confidencePercent')}")
        assert data["cropId"] == expected_id

    print("\n[SUCCESS] All Backend API & Deep Vision model test assertions passed successfully!")


if __name__ == "__main__":
    test_api()
