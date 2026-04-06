import json
from pathlib import Path

INPUT_FILE = Path("raw_egger.json")   # сюда кладёшь грязный файл
OUTPUT_FILE = Path("egger_clean.json")

def load_raw(path: Path):
    text = path.read_text(encoding="utf-8").strip()
    data = json.loads(text)  # если это массив объектов
    if not isinstance(data, list):
        raise ValueError("Ожидаю JSON-массив (список объектов).")
    return data

def normalize_price(raw_price: str) -> tuple[str, str]:
    """
    raw_price: строка вида '9 668 руб.'
    -> ('9668', '9 668 руб.')
    """
    price_text = raw_price.strip()
    numeric = "".join(ch for ch in price_text if ch.isdigit())
    return numeric, price_text

def normalize_item(obj: dict) -> dict:
    # Берём поля из твоего формата
    name = str(obj.get("Field2", "")).strip()
    url = str(obj.get("Field1_links", "")).strip()
    image = str(obj.get("Image_URL", "")).strip()
    raw_price = str(obj.get("Field3", "")).strip()
    unit = str(obj.get("Field4", "")).strip()  # '/шт' и т.п.

    price, price_text_only = normalize_price(raw_price)
    price_text = f"{price_text_only} {unit}".strip()

    return {
        "name": name,
        "url": url,
        "image": image,
        "price": price,
        "price_text": price_text,
    }

def main():
    raw_list = load_raw(INPUT_FILE)

    cleaned = []
    seen = set()

    for obj in raw_list:
        if not isinstance(obj, dict):
            continue

        item = normalize_item(obj)

        # ключ для удаления дублей
        key = (item["name"], item["url"])
        if key in seen:
            continue
        seen.add(key)

        cleaned.append(item)

    OUTPUT_FILE.write_text(
        json.dumps(cleaned, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Готово. Сохранено {len(cleaned)} позиций в {OUTPUT_FILE.name}")

if __name__ == "__main__":
    main()
