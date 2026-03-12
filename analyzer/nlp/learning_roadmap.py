TOPIC_RESOURCES = {
    "python": [
        "Python Official Docs – https://docs.python.org/3/",
        "Automate the Boring Stuff with Python (Book / Online)",
        "Real Python Tutorials – https://realpython.com/",
    ],
    "java": [
        "Java Tutorials – https://docs.oracle.com/javase/tutorial/",
        "Baeldung Java Guides – https://www.baeldung.com/",
    ],
    "django": [
        "Django Official Tutorial – https://docs.djangoproject.com/",
        "Django for APIs (William S. Vincent)",
    ],
    "flask": [
        "Flask Mega-Tutorial (Miguel Grinberg)",
        "Flask Docs – https://flask.palletsprojects.com/",
    ],
    "machine learning": [
        "Andrew Ng Machine Learning (Coursera)",
        "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
    ],
    "deep learning": [
        "DeepLearning.AI Specialization (Coursera)",
        "fast.ai Practical Deep Learning",
    ],
    "nlp": [
        "Hugging Face Course – https://huggingface.co/course",
        "NLTK Book – https://www.nltk.org/book/",
    ],
    "sql": [
        "SQLBolt Interactive Lessons – https://sqlbolt.com/",
        "Mode Analytics SQL Tutorial – https://mode.com/sql-tutorial/",
    ],
    "javascript": [
        "JavaScript.info – https://javascript.info/",
        "MDN JavaScript Guide – https://developer.mozilla.org/",
    ],
    "react": [
        "React Official Docs – https://react.dev/",
        "Full Modern React Tutorial (Net Ninja, YouTube)",
    ],
    "aws": [
        "AWS Skill Builder – https://skillbuilder.aws/",
        "AWS Certified Cloud Practitioner (free/trial courses)",
    ],
    "docker": [
        "Docker Official Docs – https://docs.docker.com/get-started/",
        "Play with Docker Labs – https://labs.play-with-docker.com/",
    ],
    "kubernetes": [
        "Kubernetes Docs – https://kubernetes.io/docs/home/",
        "Kubernetes Basics (interactive) – https://kubernetes.io/docs/tutorials/kubernetes-basics/",
    ],
    "git": [
        "Pro Git Book – https://git-scm.com/book/en/v2",
        "Atlassian Git Tutorials – https://www.atlassian.com/git",
    ],
}


def _default_resources(skill: str):
    return [
        f"{skill.title()} overview on MDN / official docs / vendor site",
        f"High-rated {skill} course on Coursera/Udemy/edX",
        f"Build 2–3 mini projects using {skill}",
    ]


def generate_learning_roadmap(missing_skills):
    """
    Generates a learning roadmap based on missing skills with curated resources
    where available, and generic but practical guidance otherwise.
    """
    roadmap = {}

    for raw_skill in missing_skills:
        skill = raw_skill.lower()
        resources = TOPIC_RESOURCES.get(skill, _default_resources(skill))

        roadmap[raw_skill] = {
            "level": "Beginner → Intermediate",
            "suggested_resources": resources,
        }

    return roadmap
