import pathlib

p = pathlib.Path('backend/webapp/views.py')
lines = p.read_text().splitlines()
for i in range(415, 426):
    print(f"{i+1:04d}: {lines[i]!r}")
