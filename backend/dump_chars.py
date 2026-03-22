import sys
from pathlib import Path

if len(sys.argv) != 4:
    print('Usage: python dump_chars.py <file> <line> <col>')
    sys.exit(1)

path = Path(sys.argv[1])
line_no = int(sys.argv[2])
col = int(sys.argv[3])
lines = path.read_text(encoding='utf-8').splitlines(True)
line = lines[line_no - 1]
print(f'Line {line_no} repr: {line!r}')
print('Line content:', line)
print('Chars:')
for i, ch in enumerate(line, start=1):
    if i == col:
        marker = '<--'
    else:
        marker = ''
    print(f'{i:03d}: {ord(ch):04d} {ch!r} {marker}')
