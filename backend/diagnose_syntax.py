import tokenize
from pathlib import Path

path = Path('backend/webapp/views.py')

try:
    with tokenize.open(path) as f:
        tokens = list(tokenize.generate_tokens(f.readline))
    print('Tokenization succeeded: {} tokens'.format(len(tokens)))
except Exception as e:
    print('Tokenization failed:', type(e), e)
    # try to show partial tokens for debugging
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    # fallback: show simplified data around error line
    print('File length:', len(text), 'chars,', text.count('\n')+1, 'lines')
    # attempt to locate unterminated string by scanning for quotes
    lines = text.splitlines()
    for i, line in enumerate(lines, start=1):
        if "'" in line or '"' in line:
            if line.strip().startswith('#'):
                continue
            # just print some context for lines near error line 421
            if abs(i-421) < 10:
                print(f'Line {i}: {line!r}')
    raise
