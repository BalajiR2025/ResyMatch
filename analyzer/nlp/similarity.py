from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(resume_text: str, jd_text: str) -> float:
    """
    Returns similarity percentage between resume and job description
    """
    if not resume_text or not jd_text:
        return 0.0

    documents = [resume_text.lower(), jd_text.lower()]
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return round(similarity * 100, 2)
