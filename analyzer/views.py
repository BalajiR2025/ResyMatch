from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import pdfplumber
import tempfile
import os
from analyzer.nlp.final_pipeline import run_resymatch_pipeline


@api_view(['POST'])
@parser_classes((MultiPartParser, FormParser))
def analyze_resume(request):
    """
    API endpoint to analyze resume against job description.

    Expects multipart form data with:
    - resume: PDF file
    - job_description: text content

    Returns JSON with analysis results.
    """
    try:
        # Get the uploaded file
        resume_file = request.FILES.get('resume')
        if not resume_file:
            return Response(
                {'error': 'Resume file is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get the job description
        job_description = request.POST.get('job_description', '').strip()
        if not job_description:
            return Response(
                {'error': 'Job description is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Extract text from PDF
        resume_text = _extract_pdf_text(resume_file)
        if not resume_text:
            return Response(
                {'error': 'Could not extract text from PDF'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Run the analysis pipeline
        result = run_resymatch_pipeline(resume_text, job_description)

        # Round all float values to 2 decimal places for cleaner output
        result = _round_floats(result, 2)

        return Response(result, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {'error': f'Analysis failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def _extract_pdf_text(pdf_file) -> str:
    """
    Extract text from an uploaded PDF file.
    """
    try:
        # Create a temporary file to store the upload
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            for chunk in pdf_file.chunks():
                tmp_file.write(chunk)
            tmp_file_path = tmp_file.name

        # Extract text using pdfplumber
        full_text = []
        with pdfplumber.open(tmp_file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text.append(text)

        # Clean up temporary file
        os.unlink(tmp_file_path)

        # Join and normalize
        resume_text = "\n".join(full_text)
        resume_text = resume_text.lower()

        # Clean symbols
        import re
        resume_text = re.sub(r"[^a-z0-9\s]", " ", resume_text)
        resume_text = re.sub(r"\s+", " ", resume_text)

        return resume_text

    except Exception as e:
        raise Exception(f'PDF extraction error: {str(e)}')


def _round_floats(obj, decimals=2):
    """
    Recursively round all float values in a dictionary/list to specified decimal places.
    """
    if isinstance(obj, dict):
        return {k: _round_floats(v, decimals) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_round_floats(item, decimals) for item in obj]
    elif isinstance(obj, float):
        return round(obj, decimals)
    return obj

