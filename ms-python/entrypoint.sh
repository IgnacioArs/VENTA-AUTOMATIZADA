
if [ "$ENTORNO_ENV" = "produccion" ]; then
  export PORT=4000
else
  export PORT=3000
fi
exec uvicorn main.app:app --host 0.0.0.0 --port $PORT

