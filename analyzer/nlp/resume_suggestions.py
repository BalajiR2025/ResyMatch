def generate_resume_suggestions(
    resume_text,
    matched_skills,
    missing_skills,
    ats_score
):
    suggestions = []

    # 1️⃣ Missing skills suggestions
    if missing_skills:
        suggestions.append(
            f"Consider adding or learning these missing skills: {', '.join(missing_skills)}."
        )

    # 2️⃣ Low ATS score suggestion
    if ats_score < 60:
        suggestions.append(
            "ATS score is low. Improve keyword alignment with the job description."
        )

    # 3️⃣ Weak skills presence
    if len(matched_skills) < 5:
        suggestions.append(
            "Add more relevant technical skills related to the job role."
        )

    # 4️⃣ Project section check
    if "project" not in resume_text.lower():
        suggestions.append(
            "Add a Projects section describing real-world applications and tools used."
        )

    # 5️⃣ Experience section check
    if "experience" not in resume_text.lower():
        suggestions.append(
            "Include an Experience or Internship section to strengthen your profile."
        )

    return suggestions
