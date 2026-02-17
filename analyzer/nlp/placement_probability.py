def placement_probability(ats_score):
    """
    Estimate placement probability based on ATS score
    """
    if ats_score >= 80:
        return "High (70–90%)"
    elif ats_score >= 60:
        return "Medium (40–70%)"
    elif ats_score >= 40:
        return "Low (20–40%)"
    else:
        return "Very Low (<20%)"
