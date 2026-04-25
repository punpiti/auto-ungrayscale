# Development

เอกสารนี้สรุป workflow ที่ใช้พัฒนาโปรเจค `auto-ungrayscale` ในเครื่องนี้

## 1. เปิดใช้งาน Python Environment

แนะนำใช้ `.venv` เฉพาะโปรเจคนี้ เพื่อไม่ไปชนกับ Conda env เก่าหรือ env ของโปรเจคอื่น

สร้างครั้งแรก:

```bash
python -m venv .venv
```

เปิดใช้งานบน WSL/Linux/macOS:

```bash
source .venv/bin/activate
```

เปิดใช้งานบน Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

ถ้ายังไม่ได้ลง dependency:

```bash
python -m pip install -r requirements.txt
```

ใน VS Code ใช้คำสั่ง `Tasks: Run Task` แล้วเลือกได้:

- `Python: create .venv`
- `Python: install requirements`
- `Generate extension icons`

## 2. สร้างไอคอนใหม่

ไฟล์ต้นฉบับอยู่ที่ `assets/source.png` และสคริปต์สร้างไอคอนอยู่ที่ `scripts/img_crop.py`

รัน:

```bash
python scripts/img_crop.py
```

ผลลัพธ์จะถูกเขียนไปที่:

```text
extension/icon/
```

## 3. โหลด Extension เข้า Chrome

1. เปิด `chrome://extensions`
2. เปิด `Developer mode`
3. กด `Load unpacked`
4. เลือกโฟลเดอร์ `extension`

## 4. โครงสร้างที่ควรใช้ต่อจากนี้

- `assets/` เก็บไฟล์ต้นฉบับ
- `scripts/` เก็บสคริปต์ช่วยงาน
- `extension/` เก็บตัว extension ที่พร้อมโหลด
- `dist/` เก็บไฟล์ export หรือไฟล์แพ็ก
- โฟลเดอร์นี้เป็นทั้ง working tree และ GitHub repo หลัก

## 5. แนวทางแก้ไฟล์

- ถ้าแก้ logic ของ extension ให้แก้ในโฟลเดอร์นี้ก่อน
- ถ้าสร้าง icon ใหม่ ให้รันสคริปต์ในโฟลเดอร์นี้ก่อน
- ไฟล์ใน `extension/` คือชุดเดียวกับที่ใช้เผยแพร่จริง จึงไม่ต้อง sync ข้ามโฟลเดอร์แล้ว

## 6. หมายเหตุ

- ใช้ `.venv` แยกต่อโปรเจคนี้ไปเลย ไม่ต้องพึ่ง env กลาง
- ถ้าจะเพิ่ม Python package ใหม่ ให้เพิ่มลง `requirements.txt` ด้วย
