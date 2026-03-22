import pathlib
path = pathlib.Path('backend/webapp/views.py')
text = path.read_text(encoding='utf-8')
for i, line in enumerate(text.splitlines(), start=1):
    if '"""' in line or "'''" in line:
        print(i, line)
