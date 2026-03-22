import pathlib
import tokenize

path = pathlib.Path('backend/webapp/views.py')
with path.open('rb') as f:
    tokens = list(tokenize.tokenize(f.readline))

# Print tokens around the location of the syntax error (line 421)
for tok in tokens:
    if tok.start[0] >= 415 and tok.start[0] <= 430:
        print(tok)
