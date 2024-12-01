# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN apt-get update && apt-get install -y --no-install-recommends gcc \
    && pip install --no-cache-dir --timeout=10000 -r requirements.txt \
    && apt-get remove -y gcc \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Deshabilitar uso de GPU en TensorFlow
ENV CUDA_VISIBLE_DEVICES="-1"

# Descargar recursos de NLTK, incluyendo punkt_tab
RUN python -m nltk.downloader punkt wordnet omw-1.4 punkt_tab

# Copy application files
COPY . .

# Define environment variables
ARG ENTORNO_ENV
ENV ENTORNO_ENV=${ENTORNO_ENV}

# Expose ports
EXPOSE 3000
EXPOSE 4000

# Entrypoint
RUN echo '#!/bin/sh \n\
if [ "$ENTORNO_ENV" = "produccion" ]; then \n\
  export PORT=4000 \n\
else \n\
  export PORT=3000 \n\
fi \n\
exec uvicorn main.app:app --host 0.0.0.0 --port $PORT' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]










