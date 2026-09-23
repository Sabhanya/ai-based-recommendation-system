"""
Croply AI - Improved Deep Learning Crop Image Classifier
MobileNetV3-Large Transfer Learning
"""

import os
import json
import copy
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms


CROP_DISPLAY_METADATA = {
    "jasmine": {"name": "Jasmine", "nameTe": "మల్లెపువ్వు (మల్లె)", "category": "Flowering Crops"},
    "tomato": {"name": "Tomato", "nameTe": "టమాట", "category": "Vegetables"},
    "potato": {"name": "Potato", "nameTe": "బంగాళాదుంప (ఆలుగడ్డ)", "category": "Vegetables"},
    "mango": {"name": "Mango", "nameTe": "మామిడి", "category": "Fruits & Orchards"},
    "banana": {"name": "Banana", "nameTe": "అరటి", "category": "Fruits & Orchards"},
    "rice": {"name": "Rice (Paddy)", "nameTe": "వరి", "category": "Cereals"},
    "maize": {"name": "Maize (Corn)", "nameTe": "మొక్కజొన్న", "category": "Cereals"},
    "cotton": {"name": "Cotton", "nameTe": "పత్తి", "category": "Cash Crops"},
    "chilli": {"name": "Chilli", "nameTe": "పచ్చిమిర్చి", "category": "Vegetables"},
    "onion": {"name": "Onion", "nameTe": "ఉల్లిపాయ", "category": "Vegetables"},
    "brinjal": {"name": "Brinjal (Eggplant)", "nameTe": "వంకాయ", "category": "Vegetables"},
    "okra": {"name": "Okra (Lady's Finger)", "nameTe": "బెండకాయ", "category": "Vegetables"},
    "apple": {"name": "Apple", "nameTe": "యాపిల్", "category": "Fruits & Orchards"},
    "orange": {"name": "Orange", "nameTe": "నారింజ", "category": "Fruits & Orchards"},
    "grapes": {"name": "Grapes", "nameTe": "ద్రాక్ష", "category": "Fruits & Orchards"},
    "papaya": {"name": "Papaya", "nameTe": "బొప్పాయి", "category": "Fruits & Orchards"},
    "guava": {"name": "Guava", "nameTe": "జామ", "category": "Fruits & Orchards"},
    "pomegranate": {"name": "Pomegranate", "nameTe": "దానిమ్మ", "category": "Fruits & Orchards"},
    "watermelon": {"name": "Watermelon", "nameTe": "పుచ్చకాయ", "category": "Fruits & Orchards"},
    "coconut": {"name": "Coconut", "nameTe": "కొబ్బరి", "category": "Plantation Crops"},
    "coffee": {"name": "Coffee", "nameTe": "కాఫీ", "category": "Plantation Crops"},
    "groundnut": {"name": "Groundnut (Peanut)", "nameTe": "వేరుశనగ", "category": "Cash Crops"},
    "wheat": {"name": "Wheat", "nameTe": "గోధుమ", "category": "Cereals"},
    "sugarcane": {"name": "Sugarcane", "nameTe": "చెరకు", "category": "Cash Crops"}
}


def train_image_classifier(
    data_dir="image_dataset",
    num_epochs=20,
    batch_size=16,
    learning_rate=0.0001,
    model_save_path="crop_image_model.pth",
    classes_save_path="crop_image_classes.json"
):

    print("\n==============================================")
    print(" Croply AI - Crop Image Model Training")
    print(" MobileNetV3-Large Transfer Learning")
    print("==============================================\n")

    train_dir = os.path.join(data_dir, "train")
    val_dir = os.path.join(data_dir, "val")
    test_dir = os.path.join(data_dir, "test")

    if not os.path.isdir(train_dir):
        raise FileNotFoundError(f"Train folder not found: {train_dir}")

    if not os.path.isdir(val_dir):
        raise FileNotFoundError(f"Validation folder not found: {val_dir}")

    print("[1/6] Loading dataset...")

    train_transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.RandomResizedCrop(224, scale=(0.75, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(20),
        transforms.ColorJitter(
            brightness=0.20,
            contrast=0.20,
            saturation=0.15
        ),
        transforms.ToTensor(),
        transforms.Normalize(
            [0.485, 0.456, 0.406],
            [0.229, 0.224, 0.225]
        )
    ])

    eval_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            [0.485, 0.456, 0.406],
            [0.229, 0.224, 0.225]
        )
    ])

    train_dataset = datasets.ImageFolder(
        train_dir,
        transform=train_transform
    )

    val_dataset = datasets.ImageFolder(
        val_dir,
        transform=eval_transform
    )

    test_dataset = None

    if os.path.isdir(test_dir):
        test_dataset = datasets.ImageFolder(
            test_dir,
            transform=eval_transform
        )

    class_names = train_dataset.classes
    num_classes = len(class_names)

    print(f"\nClasses found: {num_classes}")
    print(class_names)

    # IMPORTANT:
    # train / validation / test must have exactly same class mapping
    if val_dataset.classes != class_names:
        raise RuntimeError(
            "\nERROR: Train and validation class folders do not match!\n"
            f"Train classes: {class_names}\n"
            f"Val classes:   {val_dataset.classes}"
        )

    if test_dataset is not None and test_dataset.classes != class_names:
        raise RuntimeError(
            "\nERROR: Train and test class folders do not match!\n"
            f"Train classes: {class_names}\n"
            f"Test classes:  {test_dataset.classes}"
        )

    print("\nClass mapping:")
    for i, name in enumerate(class_names):
        print(f"  {i:02d} -> {name}")

    train_loader = torch.utils.data.DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=0
    )

    val_loader = torch.utils.data.DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=0
    )

    test_loader = None

    if test_dataset is not None:
        test_loader = torch.utils.data.DataLoader(
            test_dataset,
            batch_size=batch_size,
            shuffle=False,
            num_workers=0
        )

    device = torch.device(
        "cuda" if torch.cuda.is_available() else "cpu"
    )

    print(f"\nDevice: {device}")
    print(f"Training images:   {len(train_dataset)}")
    print(f"Validation images: {len(val_dataset)}")

    if test_dataset:
        print(f"Test images:       {len(test_dataset)}")

    # ------------------------------------------------
    # MOBILE NET V3 LARGE
    # ------------------------------------------------

    print("\n[2/6] Loading MobileNetV3-Large pretrained model...")

    weights = models.MobileNet_V3_Large_Weights.DEFAULT

    model = models.mobilenet_v3_large(
        weights=weights
    )

    # ------------------------------------------------
    # FREEZE ONLY EARLY LAYERS
    # Keep later layers trainable
    # ------------------------------------------------

    print("[3/6] Preparing transfer-learning layers...")

    for param in model.features.parameters():
        param.requires_grad = False

    # Unfreeze last feature blocks
    for param in model.features[-4:].parameters():
        param.requires_grad = True

    # Replace classifier
    in_features = model.classifier[0].in_features

    model.classifier = nn.Sequential(
        nn.Linear(in_features, 512),
        nn.Hardswish(),
        nn.Dropout(0.3),
        nn.Linear(512, num_classes)
    )

    model = model.to(device)

    criterion = nn.CrossEntropyLoss()

    optimizer = optim.AdamW(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=learning_rate,
        weight_decay=1e-4
    )

    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer,
        mode="max",
        factor=0.5,
        patience=2
    )

    best_val_acc = 0.0
    best_model_weights = copy.deepcopy(model.state_dict())

    print("\n[4/6] Starting training...\n")

    for epoch in range(num_epochs):

        print(
            f"Epoch {epoch + 1}/{num_epochs}"
        )

        # ---------------- TRAIN ----------------

        model.train()

        train_loss = 0.0
        train_correct = 0
        train_total = 0

        for inputs, labels in train_loader:

            inputs = inputs.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()

            outputs = model(inputs)

            loss = criterion(
                outputs,
                labels
            )

            loss.backward()

            optimizer.step()

            train_loss += (
                loss.item() * inputs.size(0)
            )

            predictions = outputs.argmax(
                dim=1
            )

            train_correct += (
                predictions == labels
            ).sum().item()

            train_total += labels.size(0)

        train_loss /= train_total
        train_acc = train_correct / train_total

        # ---------------- VALIDATION ----------------

        model.eval()

        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():

            for inputs, labels in val_loader:

                inputs = inputs.to(device)
                labels = labels.to(device)

                outputs = model(inputs)

                loss = criterion(
                    outputs,
                    labels
                )

                val_loss += (
                    loss.item() * inputs.size(0)
                )

                predictions = outputs.argmax(
                    dim=1
                )

                val_correct += (
                    predictions == labels
                ).sum().item()

                val_total += labels.size(0)

        val_loss /= val_total
        val_acc = val_correct / val_total

        scheduler.step(val_acc)

        print(
            f"  Train Loss: {train_loss:.4f} | "
            f"Train Acc: {train_acc * 100:.2f}%"
        )

        print(
            f"  Val Loss:   {val_loss:.4f} | "
            f"Val Acc:   {val_acc * 100:.2f}%"
        )

        # IMPORTANT: real deep copy
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            best_model_weights = copy.deepcopy(
                model.state_dict()
            )
            print(
                f"  [*] Best model updated: "
                f"{best_val_acc * 100:.2f}%"
            )

        print()

    # ------------------------------------------------
    # RESTORE BEST MODEL
    # ------------------------------------------------

    print("[5/6] Restoring best validation model...")

    model.load_state_dict(
        best_model_weights
    )

    model.eval()

    # ------------------------------------------------
    # TEST
    # ------------------------------------------------

    test_acc = 0.0

    if test_loader is not None:

        test_correct = 0
        test_total = 0

        with torch.no_grad():

            for inputs, labels in test_loader:

                inputs = inputs.to(device)
                labels = labels.to(device)

                outputs = model(inputs)

                predictions = outputs.argmax(
                    dim=1
                )

                test_correct += (
                    predictions == labels
                ).sum().item()

                test_total += labels.size(0)

        test_acc = test_correct / test_total

        print(
            f"\nTEST ACCURACY: "
            f"{test_acc * 100:.2f}% "
            f"({test_correct}/{test_total})"
        )

    # ------------------------------------------------
    # SAVE MODEL
    # ------------------------------------------------

    print("\n[6/6] Saving model...")

    torch.save(
        {
            "state_dict": model.state_dict(),
            "num_classes": num_classes,
            "class_names": class_names,
            "val_accuracy": float(best_val_acc),
            "test_accuracy": float(test_acc)
        },
        model_save_path
    )

    classes_data = {
        "classes_count": num_classes,
        "class_names": class_names,
        "classes_metadata": {
            cls: CROP_DISPLAY_METADATA.get(
                cls,
                {
                    "name": cls.capitalize(),
                    "nameTe": cls.capitalize(),
                    "category": "Agricultural Plant"
                }
            )
            for cls in class_names
        }
    }

    with open(
        classes_save_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            classes_data,
            f,
            indent=2,
            ensure_ascii=False
        )

    print(
        f"\n[SUCCESS] Model saved:"
        f"\n{model_save_path}"
    )

    print(
        f"[SUCCESS] Classes saved:"
        f"\n{classes_save_path}"
    )

    print(
        f"\nBest Validation Accuracy: "
        f"{best_val_acc * 100:.2f}%"
    )

    print(
        f"Test Accuracy: "
        f"{test_acc * 100:.2f}%"
    )

    return model


if __name__ == "__main__":

    current_dir = os.path.dirname(
        os.path.abspath(__file__)
    )

    data_directory = os.path.join(
        current_dir,
        "image_dataset"
    )

    model_out = os.path.join(
        current_dir,
        "crop_image_model.pth"
    )

    classes_out = os.path.join(
        current_dir,
        "crop_image_classes.json"
    )

    train_image_classifier(
        data_dir=data_directory,
        num_epochs=15,
        batch_size=16,
        learning_rate=0.0001,
        model_save_path=model_out,
        classes_save_path=classes_out
    )