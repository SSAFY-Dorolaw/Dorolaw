# python file_tree.py
# 현재 디렉토리 내 모든 파일과 폴더 구조를 트리 형태로 출력하여 
# file_tree.txt 파일로 저장하는 Python 코드

import os

def list_files(startpath):
    tree = []
    for root, dirs, files in os.walk(startpath):
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * level
        tree.append(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            tree.append(f"{subindent}{f}")
    return tree

# 현재 디렉토리의 파일 트리를 생성
file_tree = list_files('.')

# 결과를 file_tree.txt 파일에 저장
with open("file_tree.txt", "w") as f:
    f.write("\n".join(file_tree))