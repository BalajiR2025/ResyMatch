def resume_suggestions(resume_text, missing_skills, ats_score):
    suggestions = []

    if ats_score < 60:
        suggestions.append("Improve skill match with job description")

    if len(missing_skills) > 0:
        suggestions.append(f"Add these skills: {', '.join(missing_skills)}")

    if len(resume_text.split()) < 300:
        suggestions.append("Resume looks short, consider adding projects")

    return suggestions
