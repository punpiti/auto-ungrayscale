from pathlib import Path

from PIL import Image

# ---------- CONFIG ----------
ROOT_DIR = Path(__file__).resolve().parents[1]
INPUT_FILE = ROOT_DIR / "assets" / "source.png"
OUTPUT_DIR = ROOT_DIR / "extension" / "icon"

# bounding box ของโลโก้ใหญ่ (ขวาสุด)
# ปรับได้เล็กน้อยถ้าภาพคุณต่างจากนี้
CROP_BOX = (1250, 250, 2250, 1250)
# (left, top, right, bottom)
# ----------------------------

img = Image.open(INPUT_FILE).convert("RGB")
logo = img.crop(CROP_BOX)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

sizes = [16, 48, 128]
for size in sizes:
    out = logo.resize((size, size), Image.LANCZOS)
    out.save(OUTPUT_DIR / f"icon{size}.jpg", format="JPEG", quality=95, optimize=True)

print(f"Done: generated icons in {OUTPUT_DIR}")
