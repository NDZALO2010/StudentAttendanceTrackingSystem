import pathlib

path = pathlib.Path('backend/webapp/views.py')
text = path.read_text(encoding='utf-8')
lines = text.splitlines(True)  # keep newline chars

for line_no in (995, 996, 997, 998, 999, 1000, 1001, 1002, 1003):
    line = lines[line_no - 1]
    print('Line', line_no, 'repr:', repr(line))
    if line_no == 1001:
        print('  first 40 chars repr:', repr(line[:40]))
    print('---')
