"""Shared carving machinery for the site's seals.

The seals are 白文 (yin-carved): the character is cut away and prints light
against an inked field — here a rose block (#a61e4d, the site's link colour)
with the glyph in cream.

What keeps it from looking like a character in a box is the block. It is a
pressed stamp, not a rectangle: the outline is walked by arc length and pushed
along its normal by fine noise, with a few deeper inward bites for chips. The
shape is computed once in unit space from a fixed seed, so every size is the
same stamp and rebuilds are stable.
"""
import math
import os
import random
import struct
import urllib.request
from io import BytesIO

from PIL import Image, ImageChops, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))

ROSE = (166, 30, 77, 255)      # #a61e4d — matches --link-color in src/style.css
CREAM = (255, 240, 243, 255)   # #fff0f3

FONT_FILE = 'PottaOne-Regular.ttf'
FONT_URL = ('https://github.com/google/fonts/raw/main/ofl/pottaone/'
            + FONT_FILE)


def font():
    """Path to Potta One (Google Fonts, OFL), fetched on first use.

    The TTF is ~5MB, which is a lot to carry in the repo for a build-time
    script, so it is downloaded next to this file and gitignored instead.
    """
    path = os.path.join(HERE, FONT_FILE)
    if not os.path.exists(path):
        print(f'fetching {FONT_FILE} from Google Fonts …')
        urllib.request.urlretrieve(FONT_URL, path)
    return path


# ---------------------------------------------------------------- rasterising


def font_glyph(ch, S, box, font_path, squeeze=False, widen=1.0, into=None, px=700):
    """Set one character from a font and fit its ink into `box`.

    The glyph is rendered large, cropped to its actual ink (font metrics carry
    side bearings and a full em box, which would leave the character floating
    off-centre in its cell), then scaled into place.
    """
    from PIL import ImageFont

    font = ImageFont.truetype(font_path, px)
    canvas = Image.new('L', (px * 2, px * 2), 0)
    ImageDraw.Draw(canvas).text((px // 2, px // 2), ch, font=font, fill=255)
    ink = canvas.crop(canvas.getbbox())

    bw, bh = (box[2] - box[0]) * S, (box[3] - box[1]) * S
    if squeeze:
        tw, th = bw, bh
    else:
        s = min(bw / ink.width, bh / ink.height)
        tw, th = ink.width * s, min(ink.height * s * 1.0, bh)
        tw = min(tw * widen, bw)
    glyph = ink.resize((max(1, int(tw)), max(1, int(th))), Image.LANCZOS)

    mask = into if into is not None else Image.new('L', (S, S), 0)
    pos = (int((box[0] + box[2]) / 2 * S - glyph.width / 2),
           int((box[1] + box[3]) / 2 * S - glyph.height / 2))
    layer = Image.new('L', (S, S), 0)
    layer.paste(glyph, pos)
    return ImageChops.lighter(mask, layer.point(lambda v: 255 if v > 110 else 0))


def thicken(mask, S, dilate):
    """Thicken (positive) or thin (negative) the strokes by a fraction of the tile.

    Thinning matters for a heavy face at small sizes: the gaps close before the
    strokes do, so eroding buys back the counters that carry legibility.
    """
    k = int(round(abs(dilate) * S)) | 1
    if k > 1:
        f = ImageFilter.MaxFilter(k) if dilate > 0 else ImageFilter.MinFilter(k)
        mask = mask.filter(f).point(lambda v: 255 if v > 127 else 0)
    return mask


def block_outline(radius, rough, chips, seed=11, n=1440):
    """The stamp's edge in unit coordinates: a rounded square, worn unevenly."""
    rnd = random.Random(seed)
    waves = [(rnd.uniform(0, 1), f, 1.0 / f) for f in (7, 11, 19, 31, 53)]
    norm = sum(a for _, _, a in waves)
    bites = [(rnd.uniform(0, 1), rnd.uniform(0.008, 0.026), rnd.uniform(0.5, 1.6))
             for _ in range(chips)]

    def wobble(t):
        v = sum(a * math.sin(2 * math.pi * (f * t + p)) for p, f, a in waves) / norm
        for c, w, depth in bites:                      # chips only ever bite inward
            d = min(abs(t - c), 1 - abs(t - c))
            if d < w:
                v -= depth * (1 - d / w) ** 2
        return v

    r = radius
    side, arc = 1 - 2 * r, math.pi / 2 * radius
    per = 4 * side + 4 * arc

    def at_s(s):
        """Position and outward normal at arc length `s`, clockwise from top-left."""
        for i in range(4):
            cx = r if i in (2, 3) else 1 - r
            cy = r if i in (3, 0) else 1 - r
            if s < side:
                if i == 0:
                    return (r + s, 0.0), (0.0, -1.0)
                if i == 1:
                    return (1.0, r + s), (1.0, 0.0)
                if i == 2:
                    return (1 - r - s, 1.0), (0.0, 1.0)
                return (0.0, 1 - r - s), (-1.0, 0.0)
            s -= side
            if s < arc:
                a = -math.pi / 2 + i * math.pi / 2 + (s / arc) * math.pi / 2
                nx, ny = math.cos(a), math.sin(a)
                return (cx + r * nx, cy + r * ny), (nx, ny)
            s -= arc
        return (r, 0.0), (0.0, -1.0)

    pts = []
    for i in range(n):
        t = i / n
        (x, y), (nx, ny) = at_s(t * per)
        d = rough * wobble(t)
        pts.append((x + nx * d, y + ny * d))
    return pts


def block_mask(S, radius, rough, chips, seed=11):
    m = Image.new('L', (S, S), 0)
    pts = [(x * (S - 1), y * (S - 1)) for x, y in block_outline(radius, rough, chips, seed)]
    ImageDraw.Draw(m).polygon(pts, fill=255)
    return m


def press(S, glyph, radius, rough, chips, seed=11):
    """Ink the block and cut the glyph out of it."""
    block = block_mask(S, radius, rough, chips, seed)
    field = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    field.paste(Image.new('RGBA', (S, S), ROSE), (0, 0), block)
    # Clip the glyph to the block, so a chip that bites into the character takes
    # the ink with it instead of leaving cream floating off the stamp
    field.paste(Image.new('RGBA', (S, S), CREAM), (0, 0), ImageChops.multiply(glyph, block))
    return field


# ---------------------------------------------------------------- ico writing

def write_ico(path, images):
    """Multi-size .ico with PNG-encoded entries, one per tuned size.

    Pillow's own ICO writer rescales a single master, which would throw away the
    per-size cuts, so the container is written by hand.
    """
    blobs = []
    for im in images:
        buf = BytesIO()
        im.save(buf, format='PNG')
        blobs.append(buf.getvalue())

    offset = 6 + 16 * len(blobs)
    out = bytearray(struct.pack('<HHH', 0, 1, len(blobs)))
    for im, blob in zip(images, blobs):
        w, h = im.size
        out += struct.pack('<BBBBHHII', w % 256, h % 256, 0, 0, 1, 32, len(blob), offset)
        offset += len(blob)
    for blob in blobs:
        out += blob
    open(path, 'wb').write(bytes(out))
