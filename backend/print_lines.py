import sys
from pathlib import Path

if len(sys.argv) != 4:
    print('Usage: python print_lines.py <file> <start> <end>')
    sys.exit(1)

path = Path(sys.argv[1])
start = int(sys.argv[2])
end = int(sys.argv[3])

lines = path.read_text(encoding='utf-8').splitlines()
for i in range(start-1, end):
    print(f"{i+1:4d}: {lines[i]!r}")
