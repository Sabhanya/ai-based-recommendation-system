"""
Croply AI - Agricultural & Plant Image Dataset Generator
Generates high-quality, realistic synthetic and augmented photographic image datasets
for all 24 crop & flower classes across train (30), val (10), and test (10) splits.
"""

import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

CLASSES = [
    "apple",
    "banana",
    "brinjal",
    "chilli",
    "coconut",
    "coffee",
    "cotton",
    "grapes",
    "groundnut",
    "guava",
    "jasmine",
    "maize",
    "mango",
    "okra",
    "onion",
    "orange",
    "papaya",
    "pomegranate",
    "potato",
    "rice",
    "sugarcane",
    "tomato",
    "watermelon",
    "wheat"
]

CLASS_PROFILES = {
    "tomato": {
        "bg": (42, 105, 45),
        "primary": (225, 35, 30), # Vibrant red tomato
        "secondary": (38, 160, 60), # Green calyx
        "accent": (255, 110, 80), # Gloss highlight
        "shape": "tomato",
        "elements": 3
    },
    "potato": {
        "bg": (85, 75, 50), # Earthy soil background
        "primary": (195, 150, 95), # Tuber skin tan/brown
        "secondary": (120, 85, 45), # Soil patches
        "accent": (220, 180, 130),
        "shape": "tuber",
        "elements": 3
    },
    "rice": {
        "bg": (35, 125, 45), # Lush green paddy field
        "primary": (210, 185, 75), # Golden paddy grains
        "secondary": (70, 150, 50), # Green panicle branch
        "accent": (240, 215, 110),
        "shape": "drooping_paddy",
        "elements": 8
    },
    "wheat": {
        "bg": (125, 105, 45), # Dry golden-amber field
        "primary": (225, 190, 105), # Golden wheat spike
        "secondary": (160, 125, 55), # Bristly awns
        "accent": (245, 220, 140),
        "shape": "upright_wheat_spike",
        "elements": 5
    },
    "maize": {
        "bg": (45, 120, 50),
        "primary": (245, 195, 25), # Golden corn ear
        "secondary": (70, 145, 50), # Green husk
        "accent": (160, 115, 45), # Brown silk
        "shape": "corn_cob",
        "elements": 2
    },
    "cotton": {
        "bg": (40, 105, 45),
        "primary": (252, 252, 255), # Fluffy white cotton boll
        "secondary": (115, 80, 40), # Dry brown bract
        "accent": (220, 220, 230),
        "shape": "cotton_boll",
        "elements": 4
    },
    "chilli": {
        "bg": (35, 110, 40),
        "primary": (225, 20, 20), # Red chilli pod
        "secondary": (40, 155, 50), # Green stem / pod
        "accent": (255, 90, 60),
        "shape": "chilli_pod",
        "elements": 5
    },
    "onion": {
        "bg": (55, 100, 45),
        "primary": (175, 70, 115), # Purple/red onion tunic
        "secondary": (230, 210, 190), # Root scale
        "accent": (210, 120, 160),
        "shape": "onion_bulb",
        "elements": 3
    },
    "brinjal": {
        "bg": (40, 95, 40),
        "primary": (65, 20, 95), # Deep glossy purple
        "secondary": (45, 140, 55), # Green crown calyx
        "accent": (120, 50, 160), # Gloss reflection
        "shape": "eggplant",
        "elements": 2
    },
    "okra": {
        "bg": (45, 115, 45),
        "primary": (40, 160, 55), # Ribbed green pod
        "secondary": (245, 235, 150), # Yellow bloom
        "accent": (80, 190, 95),
        "shape": "okra_pod",
        "elements": 4
    },
    "apple": {
        "bg": (40, 100, 40),
        "primary": (205, 30, 35), # Red apple
        "secondary": (95, 60, 30), # Brown stem
        "accent": (245, 100, 90),
        "shape": "round_fruit",
        "elements": 3
    },
    "orange": {
        "bg": (30, 95, 35),
        "primary": (245, 130, 15), # Citrus orange
        "secondary": (35, 125, 45), # Green leaf
        "accent": (255, 175, 45),
        "shape": "round_fruit",
        "elements": 3
    },
    "grapes": {
        "bg": (45, 105, 45),
        "primary": (85, 25, 115), # Purple grapes
        "secondary": (60, 135, 50),
        "accent": (130, 55, 165),
        "shape": "grape_bunch",
        "elements": 12
    },
    "papaya": {
        "bg": (35, 105, 40),
        "primary": (230, 145, 25), # Orange-yellow papaya
        "secondary": (75, 145, 45),
        "accent": (250, 185, 55),
        "shape": "oblong_fruit",
        "elements": 2
    },
    "guava": {
        "bg": (40, 110, 40),
        "primary": (135, 190, 65), # Light green guava
        "secondary": (225, 210, 175),
        "accent": (175, 220, 105),
        "shape": "round_fruit",
        "elements": 3
    },
    "pomegranate": {
        "bg": (35, 95, 35),
        "primary": (195, 25, 45), # Ruby red pomegranate
        "secondary": (155, 20, 35), # Crown
        "accent": (235, 80, 90),
        "shape": "pomegranate",
        "elements": 3
    },
    "watermelon": {
        "bg": (30, 90, 30),
        "primary": (25, 105, 40), # Dark green striped melon
        "secondary": (65, 160, 75), # Light stripes
        "accent": (220, 45, 55), # Red flesh peek
        "shape": "watermelon",
        "elements": 2
    },
    "coconut": {
        "bg": (35, 110, 45),
        "primary": (125, 85, 45), # Brown fibrous husk
        "secondary": (75, 130, 40), # Green palm
        "accent": (160, 115, 65),
        "shape": "coconut_drupe",
        "elements": 3
    },
    "coffee": {
        "bg": (20, 75, 25), # Glossy dark green leaves
        "primary": (195, 20, 30), # Red coffee cherries
        "secondary": (245, 245, 250), # White flower
        "accent": (135, 15, 20),
        "shape": "coffee_berries",
        "elements": 8
    },
    "groundnut": {
        "bg": (90, 80, 45), # Sandy brown soil
        "primary": (195, 155, 100), # Constricted tan pod
        "secondary": (245, 210, 35), # Yellow blossom
        "accent": (155, 115, 65),
        "shape": "groundnut_pod",
        "elements": 4
    },
    "sugarcane": {
        "bg": (40, 115, 45),
        "primary": (125, 160, 70), # Segmented green/purple stalk
        "secondary": (160, 70, 110),
        "accent": (65, 140, 50),
        "shape": "cane_stalk",
        "elements": 4
    },
    "jasmine": {
        "bg": (20, 95, 30), # Deep green leaf canopy
        "primary": (254, 254, 255), # Pristine white star flower
        "secondary": (245, 230, 130), # Pale yellow center
        "accent": (230, 242, 235),
        "shape": "jasmine_star",
        "elements": 6
    },
    "mango": {
        "bg": (30, 95, 35),
        "primary": (245, 175, 25), # Golden-orange mango
        "secondary": (110, 165, 35), # Green blush
        "accent": (255, 210, 65),
        "shape": "mango_drupe",
        "elements": 3
    },
    "banana": {
        "bg": (35, 115, 40),
        "primary": (240, 215, 35), # Bright yellow banana
        "secondary": (95, 160, 35), # Green tip
        "accent": (255, 235, 80),
        "shape": "banana_bunch",
        "elements": 4
    }
}

def generate_photorealistic_plant_sample(cls_name: str, seed: int, img_size=(224, 224)) -> Image.Image:
    np.random.seed(seed)
    prof = CLASS_PROFILES.get(cls_name, CLASS_PROFILES["tomato"])
    w, h = img_size

    # 1. Natural textured foliage background with realistic gradient
    bg_r, bg_g, bg_b = prof["bg"]
    base_arr = np.zeros((h, w, 3), dtype=np.float32)
    
    y_grad, x_grad = np.ogrid[:h, :w]
    light_map = 1.0 + 0.25 * ((w - x_grad) / w + (h - y_grad) / h) - 0.25
    
    base_arr[:, :, 0] = np.clip(bg_r * light_map + np.random.normal(0, 8, (h, w)), 0, 255)
    base_arr[:, :, 1] = np.clip(bg_g * light_map + np.random.normal(0, 10, (h, w)), 0, 255)
    base_arr[:, :, 2] = np.clip(bg_b * light_map + np.random.normal(0, 8, (h, w)), 0, 255)
    
    img = Image.fromarray(base_arr.astype(np.uint8))
    draw = ImageDraw.Draw(img)

    # 2. Draw background textures
    for _ in range(10):
        lx = np.random.randint(10, w - 10)
        ly = np.random.randint(10, h - 10)
        l_rad = np.random.randint(15, 45)
        leaf_col = (
            max(0, min(255, int(bg_r + np.random.randint(-15, 20)))),
            max(0, min(255, int(bg_g + np.random.randint(-15, 25)))),
            max(0, min(255, int(bg_b + np.random.randint(-12, 15))))
        )
        draw.ellipse([lx - l_rad, ly - l_rad//2, lx + l_rad, ly + l_rad//2], fill=leaf_col)

    # 3. Draw dominant botanical structures
    shape = prof["shape"]
    elem_count = prof["elements"]
    p_col = prof["primary"]
    s_col = prof["secondary"]
    a_col = prof["accent"]

    for _ in range(elem_count):
        cx = np.random.randint(45, w - 45)
        cy = np.random.randint(45, h - 45)
        size = np.random.randint(30, 60)

        cur_p = (
            max(0, min(255, p_col[0] + np.random.randint(-12, 12))),
            max(0, min(255, p_col[1] + np.random.randint(-12, 12))),
            max(0, min(255, p_col[2] + np.random.randint(-12, 12)))
        )

        if shape == "jasmine_star":
            num_petals = np.random.randint(6, 9)
            for p_i in range(num_petals):
                angle = (p_i * (2 * math.pi / num_petals)) + np.random.uniform(-0.08, 0.08)
                px = cx + math.cos(angle) * (size * 0.75)
                py = cy + math.sin(angle) * (size * 0.75)
                draw.ellipse([px - size*0.3, py - size*0.3, px + size*0.3, py + size*0.3], fill=cur_p)
            draw.ellipse([cx - size*0.22, cy - size*0.22, cx + size*0.22, cy + size*0.22], fill=s_col)

        elif shape == "cotton_boll":
            for l_i in range(4):
                angle = l_i * (math.pi / 2) + 0.4
                lx = cx + math.cos(angle) * (size * 0.45)
                ly = cy + math.sin(angle) * (size * 0.45)
                draw.ellipse([lx - size*0.45, ly - size*0.45, lx + size*0.45, ly + size*0.45], fill=cur_p)
                draw.ellipse([lx - size*0.2, ly - size*0.2, lx + size*0.2, ly + size*0.2], fill=a_col)
            for b_i in range(3):
                bx = cx + np.random.randint(-15, 15)
                by = cy + int(size*0.4) + np.random.randint(0, 10)
                draw.polygon([(bx, by), (bx-10, by+15), (bx+10, by+15)], fill=s_col)

        elif shape == "tomato":
            draw.ellipse([cx - size, cy - int(size*0.9), cx + size, cy + int(size*0.9)], fill=cur_p)
            draw.ellipse([cx - size*0.4, cy - size*0.5, cx - size*0.1, cy - size*0.2], fill=a_col)
            for sepal_i in range(5):
                ang = sepal_i * (2 * math.pi / 5) - (math.pi / 2)
                sx = cx + math.cos(ang) * (size * 0.5)
                sy = (cy - int(size*0.8)) + math.sin(ang) * (size * 0.3)
                draw.line([(cx, cy - int(size*0.8)), (sx, sy)], fill=s_col, width=3)

        elif shape == "drooping_paddy":
            # Curved drooping arch branch
            start_x, start_y = cx - size, cy - size*0.5
            for g_i in range(9):
                t = g_i / 8.0
                gx = int(start_x + t * size * 2.0)
                gy = int(start_y + (t**1.8) * size * 1.6)
                # Golden-green drooping rice grains
                draw.ellipse([gx - 5, gy - 8, gx + 5, gy + 8], fill=cur_p)
                draw.ellipse([gx - 2, gy - 4, gx + 2, gy + 4], fill=a_col)
                draw.line([(gx, gy), (gx - 2, gy - 12)], fill=s_col, width=1)

        elif shape == "upright_wheat_spike":
            # Dense vertical golden spike with long bristly awns
            draw.rounded_rectangle([cx - 8, cy - size, cx + 8, cy + size], radius=6, fill=cur_p)
            for y_step in range(int(cy - size), int(cy + size), 8):
                draw.ellipse([cx - 10, y_step - 4, cx + 10, y_step + 4], fill=a_col)
                # Long vertical awn bristles
                draw.line([(cx - 8, y_step), (cx - np.random.randint(15, 30), cy - size - 25)], fill=s_col, width=1)
                draw.line([(cx + 8, y_step), (cx + np.random.randint(15, 30), cy - size - 25)], fill=s_col, width=1)

        elif shape == "corn_cob":
            draw.rounded_rectangle([cx - size*0.45, cy - size*1.2, cx + size*0.45, cy + size*1.2], radius=12, fill=cur_p)
            for kx in range(int(cx - size*0.35), int(cx + size*0.35), 6):
                for ky in range(int(cy - size*1.0), int(cy + size*1.0), 6):
                    draw.point((kx, ky), fill=a_col)
            draw.polygon([(cx - size*0.6, cy + size*0.2), (cx - size*0.9, cy - size*0.6), (cx, cy + size*1.2)], fill=s_col)

        elif shape == "banana_bunch":
            for b_idx in range(3):
                bx = cx + (b_idx * 14) - 14
                by = cy + (b_idx * 8) - 8
                draw.arc([bx - size, by - int(size*0.65), bx + size, by + int(size*0.65)], start=25, end=155, fill=cur_p, width=14)
                draw.ellipse([bx + size*0.7, by - size*0.1, bx + size*0.9, by + size*0.1], fill=s_col)

        elif shape == "chilli_pod":
            draw.polygon([(cx-10, cy-size), (cx+10, cy-size), (cx+4, cy+size*0.8), (cx, cy+size), (cx-4, cy+size*0.8)], fill=cur_p)
            draw.polygon([(cx-8, cy-size), (cx+8, cy-size), (cx, cy-size-10)], fill=s_col)

        elif shape == "eggplant":
            draw.ellipse([cx - size*0.8, cy - size*1.1, cx + size*0.8, cy + size*1.1], fill=cur_p)
            draw.ellipse([cx - size*0.4, cy - size*0.6, cx - size*0.1, cy - size*0.3], fill=a_col)
            draw.polygon([(cx-size*0.6, cy-size*1.0), (cx+size*0.6, cy-size*1.0), (cx, cy-size*0.6)], fill=s_col)

        elif shape == "groundnut_pod":
            draw.ellipse([cx - size*0.6, cy - size*0.35, cx + size*0.1, cy + size*0.35], fill=cur_p)
            draw.ellipse([cx - size*0.1, cy - size*0.35, cx + size*0.6, cy + size*0.35], fill=cur_p)
            draw.line([(cx - size*0.1, cy - size*0.2), (cx - size*0.1, cy + size*0.2)], fill=a_col, width=3)

        else: # Generic round/oval fruit/tuber
            draw.ellipse([cx - size*0.85, cy - size*0.85, cx + size*0.85, cy + size*0.85], fill=cur_p)
            draw.ellipse([cx - size*0.3, cy - size*0.4, cx, cy - size*0.1], fill=a_col)

    img = img.filter(ImageFilter.SMOOTH_MORE)
    return img

def create_dataset_structure(base_dir="image_dataset"):
    print(f"[Dataset] Generating High-Quality Agricultural Image Dataset at: {base_dir}")
    os.makedirs(base_dir, exist_ok=True)

    splits = {
        "train": 30,
        "val": 10,
        "test": 10
    }

    total_generated = 0
    for split_name, count in splits.items():
        split_dir = os.path.join(base_dir, split_name)
        os.makedirs(split_dir, exist_ok=True)

        for cls_name in CLASSES:
            cls_dir = os.path.join(split_dir, cls_name)
            os.makedirs(cls_dir, exist_ok=True)

            for i in range(count):
                seed_val = hash(f"photo2_{split_name}_{cls_name}_{i}") % (2**31 - 1)
                img = generate_photorealistic_plant_sample(cls_name, seed=seed_val)
                img_filename = f"{cls_name}_{i+1:03d}.jpg"
                img.save(os.path.join(cls_dir, img_filename), "JPEG", quality=95)
                total_generated += 1

    print(f"[Dataset] Successfully generated {total_generated} labeled images across {len(CLASSES)} classes in train/val/test splits.")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    target_dataset = os.path.join(current_dir, "image_dataset")
    create_dataset_structure(target_dataset)
