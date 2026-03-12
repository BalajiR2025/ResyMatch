"""
Backward-compatible wrapper around the main similarity implementation.

The primary implementation now lives in `similarity.calculate_similarity`,
which uses TF–IDF cosine similarity. This module is kept so any older imports
continue to work.
"""

from analyzer.nlp.similarity import calculate_similarity  # noqa: F401

