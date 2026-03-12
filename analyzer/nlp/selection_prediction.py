from analyzer.nlp.ats_score import ats_quality_band


def predict_selection(ats_score: float) -> dict:
    """
    Predict selection chance based on the calibrated ATS quality band.
    """
    band = ats_quality_band(ats_score)

    if band in ("Excellent", "Good"):
        return {
            "chance": "High",
            "band": band,
            "message": "Strong match. Very good chance of selection.",
        }
    if band == "Fair":
        return {
            "chance": "Medium",
            "band": band,
            "message": "Moderate match. Improve missing skills to increase chances.",
        }
    return {
        "chance": "Low",
        "band": band,
        "message": "Low match. Resume needs significant improvement.",
    }
