#!/usr/bin/env bash
# Render build script for FinanceHub backend
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt
