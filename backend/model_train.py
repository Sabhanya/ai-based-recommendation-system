"""
Croply AI - Offline Random Forest Crop Recommendation Model Trainer
Trains on Kaggle Precision Agriculture Dataset (Crop_recommendation.csv)
Saves model artifact to crop_recommendation_model.pkl
100% offline, local scikit-learn ML pipeline.
"""

import os
import pickle
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, f1_score

def train_tabular_model(csv_path="Crop_recommendation.csv", model_path="crop_recommendation_model.pkl"):
    if not os.path.exists(csv_path):
        csv_path = os.path.join("backend", csv_path)
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Dataset not found at: {csv_path}")

    print(f"[ML Train] Loading dataset from: {csv_path}")
    df = pd.read_csv(csv_path)

    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[features]
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print(f"[ML Train] Training RandomForestClassifier on {len(X_train)} samples...")
    clf = RandomForestClassifier(
        n_estimators=100,
        max_depth=None,
        random_state=42,
        n_jobs=-1
    )
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred, average='weighted')
    print(f"[ML Train] Evaluation Complete! Accuracy: {acc*100:.2f}%, F1-Score: {f1:.4f}")

    # Load existing crop parameters from previous pickle if available
    crop_parameters = {}
    if os.path.exists(model_path):
        try:
            with open(model_path, "rb") as f:
                old_data = pickle.load(f)
                if isinstance(old_data, dict) and "crop_parameters" in old_data:
                    crop_parameters = old_data["crop_parameters"]
        except Exception:
            pass

    save_data = {
        "model": clf,
        "feature_names": features,
        "classes": list(clf.classes_),
        "model_type": "RandomForestClassifier",
        "n_estimators": 100,
        "test_accuracy": float(acc),
        "f1_score": float(f1),
        "crop_parameters": crop_parameters,
        "dataset_samples": len(df)
    }

    with open(model_path, "wb") as f:
        pickle.dump(save_data, f)

    print(f"[ML Train] Model saved successfully to: {model_path}")
    return clf

if __name__ == "__main__":
    train_tabular_model()