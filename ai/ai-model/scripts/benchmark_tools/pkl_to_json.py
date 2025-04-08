import pickle
import json
import os
import sys

def convert_pkl_to_json(pkl_path, json_path):
    with open(pkl_path, 'rb') as f:
        results = pickle.load(f)

    converted = []
    for r in results:
        entry = {
            'pred_label': int(r['pred_label']),
            'gt_label': int(r['gt_label'])
        }
        if 'pred_scores' in r:
            entry['pred_scores'] = list(map(float, r['pred_scores']))
        converted.append(entry)

    with open(json_path, 'w') as f:
        json.dump(converted, f, indent=2)
    print(f"✅ Converted: {pkl_path} → {json_path}")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python pkl_to_json.py result_file.pkl")
        exit(1)

    pkl_file = sys.argv[1]
    json_file = os.path.splitext(pkl_file)[0] + '.json'
    convert_pkl_to_json(pkl_file, json_file)
