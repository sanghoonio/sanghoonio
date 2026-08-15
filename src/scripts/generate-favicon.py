"""Generate the site favicon set from the 觀 seal.

The mark and its per-size cuts live in marks.py; this script only writes the
files the browser asks for.

觀 is 25 strokes, which is a lot to hold in a tab strip. The small cuts run the
character larger and erode its strokes, since in a heavy face the counters close
before the strokes thin — that is what keeps it reading as a character rather
than a light blob. The four-character 仰觀俯察 seal was tried here first and is
worse at every size below 32px: four characters get about seven pixels each.

Usage:  python3 src/scripts/generate-favicon.py [outdir]   (default: public/)
"""
import os
import sys

from PIL import Image

import marks
import seal_lib as sl


def main(outdir):
    os.makedirs(outdir, exist_ok=True)

    sl.write_ico(os.path.join(outdir, 'favicon.ico'),
                 [marks.guan_at(s) for s in (16, 24, 32, 48, 64)])

    # iOS composites a transparent home-screen icon onto black, which would ring
    # the worn edge in a dark frame — so this one is stamped onto paper instead
    paper = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
    paper.alpha_composite(marks.guan_at(180))
    paper.save(os.path.join(outdir, 'apple-touch-icon.png'))

    marks.guan_at(192).save(os.path.join(outdir, 'android-chrome-192x192.png'))
    marks.guan_at(512).save(os.path.join(outdir, 'android-chrome-512x512.png'))
    print('wrote favicon.ico (16/24/32/48/64), apple-touch-icon.png, '
          'android-chrome-192x192.png, android-chrome-512x512.png ->', outdir)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1
         else os.path.join(sl.HERE, '..', '..', 'public'))
