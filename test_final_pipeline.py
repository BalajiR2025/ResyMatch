from analyzer.nlp.final_pipeline import run_resymatch_pipeline
from analyzer.nlp.resume_parser import extract_resume_text



resume_text = extract_resume_text("resume.pdf")


jd_text = open("job_description.txt", encoding="utf-8").read()

result = run_resymatch_pipeline(resume_text, jd_text)
print(result)
