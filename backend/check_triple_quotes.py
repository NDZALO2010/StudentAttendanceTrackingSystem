from pathlib import Path
import re

path = Path('backend/webapp/views.py')
text = path.read_text(encoding='utf-8')
occ = list(re.finditer(r"('{3}|\"{3})", text))
print('Found', len(occ), 'triple-quote markers')
for i, m in enumerate(occ[:40]):
    ln = text.count('\n', 0, m.start()) + 1
    print(i, m.group(0), 'at line', ln)
