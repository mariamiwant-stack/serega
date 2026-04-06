import json

INPUT_FILE = "LDSP-MDF-kupit-v-internet-magazine-DOM.json"
OUTPUT_FILE = "LDSP-converted.json"

def main():
    # читаем исходный JSON (ожидаем массив объектов)
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    result = []
    for item in data:
        # аккуратно достаём поля, если их вдруг нет – подставляем пустую строку
        name = item.get("Title", "").strip()
        url = item.get("Title_URL", "").strip()
        image = item.get("image", "").strip()  # если в исходном JSON есть ключ с картинкой — поправь имя

        result.append({
            "name": name,
            "url": url,
            "image": image,
            "price": "4000",
            "price_text": "4 000 руб. /шт"
        })

    # пишем результат в новый файл
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Готово, записано {len(result)} записей в {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
