from analyzer.nlp.final_pipeline import run_resymatch_pipeline
from analyzer.nlp.resume_parser import extract_resume_text

def pretty_print_result(result: dict) -> None:
    print("\n=== ResyMatch Analysis ===\n")

    print(f"Similarity Score:       {result['similarity_score_percent']}%")
    print(f"ATS Score:              {result['ats_score_percent']}% "
          f"({result['ats_quality_band']})")
    print(f"Placement Probability:  {result['placement_probability']}")
    print(f"Selection Chance:       {result['selection_summary']['chance']} "
          f"({result['selection_summary']['band']})")
    print(f"Message:                {result['selection_summary']['message']}\n")

    print("Matched Skills:")
    print("  " + ", ".join(result["matched_skills"]) or "  None")
    print("Missing Skills:")
    print("  " + ", ".join(result["missing_skills"]) or "  None")
    mb = result["match_breakdown"]
    print(f"\nSkills Match:           {mb['skills_match_percentage']}% "
          f"({mb['matched_skill_count']} / {mb['total_required_skills']})\n")

    print("Resume Strength Scorecard:")
    rs = result["resume_strength_scorecard"]
    print(f"  Total Score: {rs['total_score']}")
    for k, v in rs["breakdown"].items():
        print(f"  - {k}: {v}")

    print("\nLearning Roadmap (Missing Skills):")
    if not result["learning_roadmap"]:
        print("  None")
    else:
        for skill, info in result["learning_roadmap"].items():
            print(f"  {skill} ({info['level']}):")
            for res in info["suggested_resources"]:
                print(f"    - {res}")

    print("\nResume Suggestions:")
    for s in result["resume_suggestions"]:
        print(f"  - {s}")

    print("\nScore Explanations:")
    for key, text in result["score_explanations"].items():
        print(f"  {key}: {text}")

if __name__ == "__main__":
    resume_text = extract_resume_text("resume.pdf")
    jd_text = open("job_description.txt", encoding="utf-8").read()
    result = run_resymatch_pipeline(resume_text, jd_text)
    pretty_print_result(result)