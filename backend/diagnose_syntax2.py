import tokenize
from pathlib import Path

path = Path('backend/webapp/views.py')

def print_token(tok):
    ttype, tstring, start, end, line = tok
    print(f"{tokenize.tok_name[ttype]} {tstring!r} at {start} to {end}")

try:
    with tokenize.open(path) as f:
        gen = tokenize.generate_tokens(f.readline)
        last = None
        for tok in gen:
            last = tok
        print('Tokenization succeeded. Last token:')
        print_token(last)
except tokenize.TokenError as e:
    print('TokenError:', e)
    if isinstance(e.args[1], tuple):
        loc = e.args[1]
        print('Error location:', loc)
    # Try to recover by scanning tokens manually
    with tokenize.open(path) as f:
        gen = tokenize.generate_tokens(f.readline)
        for tok in gen:
            if tok[0] == tokenize.STRING:
                # Print recent STRING tokens
                print('STRING token:', tok[1], 'start', tok[2])
        print('Done scanning for STRING tokens.')
    
    # Dump last 20 lines of file for context
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    for i in range(len(lines)-20, len(lines)):
        print(f"{i+1:4d}: {lines[i]!r}")
