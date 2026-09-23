import pickle
import os
import csv

with open('backend/crop_recommendation_model.pkl', 'rb') as f:
    d = pickle.load(f)
params = d.get('crop_parameters', {})

os.makedirs('data', exist_ok=True)
os.makedirs('backend', exist_ok=True)

csv_paths = ['data/crop_information.csv', 'backend/crop_information.csv']

fieldnames = [
    'crop_id', 'crop_name', 'crop_name_te', 'scientific_name', 'category', 'category_te',
    'n_ideal', 'p_ideal', 'k_ideal', 'n_range', 'p_range', 'k_range',
    'ph_ideal', 'ph_range', 'temp_ideal', 'humidity_ideal', 'rainfall_ideal',
    'season', 'season_te', 'soil_type', 'soil_type_te', 'water_requirement', 'water_requirement_te'
]

scientific_names = {
    'rice': 'Oryza sativa', 'wheat': 'Triticum aestivum', 'maize': 'Zea mays',
    'cotton': 'Gossypium hirsutum', 'banana': 'Musa acuminata', 'grapes': 'Vitis vinifera',
    'apple': 'Malus domestica', 'watermelon': 'Citrullus lanatus', 'muskmelon': 'Cucumis melo',
    'chickpea': 'Cicer arietinum', 'jute': 'Corchorus olitorius', 'coffee': 'Coffea arabica',
    'mango': 'Mangifera indica', 'papaya': 'Carica papaya', 'coconut': 'Cocos nucifera',
    'pomegranate': 'Punica granatum', 'orange': 'Citrus sinensis', 'blackgram': 'Vigna mungo',
    'lentil': 'Lens culinaris', 'kidneybeans': 'Phaseolus vulgaris', 'pigeonpeas': 'Cajanus cajan',
    'mothbeans': 'Vigna aconitifolia', 'tomato': 'Solanum lycopersicum', 'potato': 'Solanum tuberosum',
    'chilli': 'Capsicum annuum', 'brinjal': 'Solanum melongena', 'okra': 'Abelmoschus esculentus',
    'onion': 'Allium cepa', 'cabbage': 'Brassica oleracea', 'cauliflower': 'Brassica oleracea var. botrytis',
    'carrot': 'Daucus carota', 'radish': 'Raphanus sativus', 'groundnut': 'Arachis hypogaea',
    'sugarcane': 'Saccharum officinarum', 'tobacco': 'Nicotiana tabacum', 'tea': 'Camellia sinensis',
    'millet': 'Pennisetum glaucum', 'sorghum': 'Sorghum bicolor', 'spinach': 'Spinacia oleracea',
    'coriander': 'Coriandrum sativum', 'fenugreek': 'Trigonella foenum-graecum', 'mint': 'Mentha',
    'cashew': 'Anacardium occidentale', 'arecanut': 'Areca catechu', 'guava': 'Psidium guajava',
    'jasmine': 'Jasminum sambac', 'amaranthus': 'Amaranthus tricolor'
}

rows = []
for cid, p in params.items():
    s_name = scientific_names.get(cid, p.get('scientificName', f"{p.get('name', cid.capitalize())} spp."))
    row = {
        'crop_id': cid,
        'crop_name': p.get('name', cid.capitalize()),
        'crop_name_te': p.get('nameTe', cid),
        'scientific_name': s_name,
        'category': p.get('category', 'Agricultural Crops'),
        'category_te': p.get('categoryTe', 'వ్యవసాయ పంటలు'),
        'n_ideal': p.get('N', {}).get('ideal', 80),
        'p_ideal': p.get('P', {}).get('ideal', 40),
        'k_ideal': p.get('K', {}).get('ideal', 40),
        'n_range': f"{p.get('N', {}).get('min', 40)} - {p.get('N', {}).get('max', 120)} kg/ha",
        'p_range': f"{p.get('P', {}).get('min', 20)} - {p.get('P', {}).get('max', 60)} kg/ha",
        'k_range': f"{p.get('K', {}).get('min', 20)} - {p.get('K', {}).get('max', 60)} kg/ha",
        'ph_ideal': p.get('ph', {}).get('ideal', 6.5),
        'ph_range': f"{p.get('ph', {}).get('min', 5.5)} - {p.get('ph', {}).get('max', 7.5)}",
        'temp_ideal': p.get('temperature', {}).get('ideal', 25.0),
        'humidity_ideal': p.get('humidity', {}).get('ideal', 70.0),
        'rainfall_ideal': p.get('rainfall', {}).get('ideal', 100.0),
        'season': p.get('season', 'Kharif / Rabi'),
        'season_te': p.get('seasonTe', 'ఖరీఫ్ / రబీ'),
        'soil_type': p.get('soilType', 'Loamy Soil'),
        'soil_type_te': p.get('soilTypeTe', 'సారవంతమైన ఒండ్రు నేలలు'),
        'water_requirement': p.get('waterRequirement', 'Medium'),
        'water_requirement_te': p.get('waterRequirementTe', 'మధ్యస్థం')
    }
    rows.append(row)

for path in csv_paths:
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows)} crops to {path}")
