import pdfplumber
import re

def extract_resume_text(pdf_path: str) -> str:
    full_text = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text.append(text)

    # Join and normalize
    resume_text = "\n".join(full_text)
    resume_text = resume_text.lower()

    # Clean symbols
    resume_text = re.sub(r"[^a-z0-9\s]", " ", resume_text)
    resume_text = re.sub(r"\s+", " ", resume_text)

    return resume_text
