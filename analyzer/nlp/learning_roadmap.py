def generate_learning_roadmap(missing_skills):
    """
    Generates a simple learning roadmap based on missing skills
    """
    roadmap = {}

    for skill in missing_skills:
        roadmap[skill] = {
            "level": "Beginner → Intermediate",
            "suggested_resources": [
                f"Learn {skill} fundamentals (YouTube)",
                f"{skill} official documentation",
                f"Practice {skill} with mini projects"
            ]
        }

    return roadmap
