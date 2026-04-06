import os
import smtplib
import logging
from email.mime.text import MIMEText

from fastapi import FastAPI, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# ─── Логирование ───────────────────────────────────────────
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Конфигурация из окружения ────────────────────────────
EMAIL_FROM    = os.getenv("EMAIL_FROM", "f.ilyaspb@yandex.ru")
EMAIL_TO      = os.getenv("EMAIL_TO", "2207120@gmail.com")
SMTP_HOST     = os.getenv("SMTP_HOST", "smtp.yandex.ru")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "465"))
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "jotfbmjuypkmeypa")

# ─── Функция отправки email (общая) ───────────────────────
def send_email(subject: str, text: str):
    msg = MIMEText(text, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"]    = EMAIL_FROM
    msg["To"]      = EMAIL_TO

    try:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(EMAIL_FROM, SMTP_PASSWORD)
            server.send_message(msg)
        logger.info("✅ Email отправлен")
        return True
    except Exception as e:
        logger.error(f"❌ Ошибка email: {e}")
        return False

# ─── Эндпоинты форм ───────────────────────────────────────
@app.post("/submit-form")
async def submit_form(
    name:  str = Form(...),
    phone: str = Form(...),
    idea:  str = Form(...)
):
    logger.info(f"📥 Новая заявка: {name}, {phone}")

    email_text = (
        f"📩 Новая заявка с сайта!\n\n"
        f"👤 Имя:    {name}\n"
        f"📞 Телефон: {phone}\n"
        f"💬 Идея:   {idea}"
    )
    send_email(f"Новая заявка от {name}", email_text)

    return {"success": True, "message": "Заявка принята!"}

@app.post("/cta-form")
async def cta_form(
    name: str = Form(...),
    phone: str = Form(...),
    type: str = Form(""),
    comment: str = Form(""),
):
    logger.info(f"📥 Новая CTA-заявка: {name}, {phone}, {type}")

    email_text = (
        "📩 Новая заявка (форма расчёта стоимости)!\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"🪑 Тип мебели: {type or 'Не указано'}\n"
        f"💬 Комментарий: {comment or 'Нет'}"
    )
    send_email(f"Расчёт стоимости от {name}", email_text)

    return {"success": True, "message": "Заявка принята!"}

@app.post("/calc-form")
async def calc_form(
    name: str = Form(...),
    phone: str = Form(...),
    type: str = Form(""),
    budget: str = Form(""),
    comment: str = Form(""),
):
    logger.info(f"📥 Новая CALC-заявка: {name}, {phone}, {type}, {budget}")

    email_text = (
        "📩 Новая заявка (ориентировочный расчёт)!\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"🪑 Что планирует: {type or 'Не указано'}\n"
        f"💰 Бюджет: {budget or 'Не указан'}\n"
        f"💬 Комментарий: {comment or 'Нет'}"
    )
    send_email(f"Ориентировочный расчёт от {name}", email_text)

    return {"success": True, "message": "Заявка принята!"}

# ─── Статика (HTML/CSS/JS сайта) ───────────────────────────
app.mount("/", StaticFiles(directory=".", html=True), name="static")