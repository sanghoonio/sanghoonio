"""Generate public/og.png, the link-preview card referenced by index.html."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
PHOTO = ROOT / "public" / "profile.png"
OUT = ROOT / "public" / "og.png"

W, H = 1200, 630
BG = (248, 249, 250)
INK = (33, 37, 41)
MUTED = (108, 117, 125)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# profile photo, square
D = 400
photo = Image.open(PHOTO).convert("RGB")
photo = photo.resize((D, D), Image.LANCZOS)
PX, PY = 120, (H - D) // 2
img.paste(photo, (PX, PY))

AVENIR = "/System/Library/Fonts/Avenir Next.ttc"
# every non-italic face in the .ttc. Avenir Next has no true Light, so there is
# nothing between Ultra Light and Regular — a weight of 300 snaps to Ultra Light.
FACES = {
    200: 10,  # Ultra Light
    400: 7,   # Regular
    500: 5,   # Medium
    600: 2,   # Demi Bold
    700: 0,   # Bold
    800: 8,   # Heavy
}

def font(size, weight=400):
    nearest = min(FACES, key=lambda w: abs(w - weight))
    return ImageFont.truetype(AVENIR, size, index=FACES[nearest])

TX = PX + D + 40
AVAIL = W - TX - 80

def fit(text, size, weight):
    """largest size at or below `size` that keeps `text` inside AVAIL"""
    while size > 12:
        f = font(size, weight)
        if draw.textlength(text, font=f) <= AVAIL:
            return f
        size -= 2
    return font(12, weight)

SUB = "data science · genomics · visualization"
draw.text((TX, 210), "Sam Park", font=fit("Sam Park", 75, 400), fill=INK)
draw.text((TX, 300), "data science", font=fit(SUB, 35, 400), fill=MUTED)
draw.text((TX, 333), "genomics", font=fit(SUB, 35, 400), fill=MUTED)
draw.text((TX, 366), "visualization", font=fit(SUB, 35, 400), fill=MUTED)
draw.text((TX, 399), "social media", font=fit(SUB, 35, 400), fill=MUTED)

img.save(OUT, "PNG", optimize=True)
print("wrote", OUT, img.size)
