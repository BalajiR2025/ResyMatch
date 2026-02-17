def predict_selection(ats_score: float) -> dict:
    """
    Predicts selection chance based on ATS score
    """
    if ats_score >= 75:
        return {
            "chance": "High",
            "message": "Strong match. Very good chance of selection."
        }
    elif ats_score >= 50:
        return {
            "chance": "Medium",
            "message": "Moderate match. Improve missing skills to increase chances."
        }
    else:
        return {
            "chance": "Low",
            "message": "Low match. Resume needs significant improvement."
        }
