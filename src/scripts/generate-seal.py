"""Write the 觀 seal as a standalone PNG.

The favicon set is cut from the same mark (see generate-favicon.py); this is the
large flat copy, for use in a page rather than a tab. marks.py also holds 見 and
仰觀俯察 if either is ever wanted.

Usage:  python3 src/scripts/generate-seal.py [outdir]   (default: public/)
"""
import os
import sys

import marks
import seal_lib as sl


def main(outdir):
    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, 'seal-guan.png')
    marks.guan_at(512).save(out)
    print('wrote', out)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1
         else os.path.join(sl.HERE, '..', '..', 'public'))
