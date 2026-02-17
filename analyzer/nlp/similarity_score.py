from difflib import SequenceMatcher

def calculate_similarity(resume_text, jd_text):
    resume_text = resume_text.lower()
    jd_text = jd_text.lower()

    similarity = SequenceMatcher(None, resume_text, jd_text).ratio()
    return min(similarity * 300, 100)

