# Usar una imagen base oficial de Python
FROM python:3.9

ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Establecer el directorio de trabajo
WORKDIR /app/src

# Copiar los archivos de requerimientos e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente
COPY . .

# Exponer el puerto 8080
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "src.main:app","--reload", "--host", "0.0.0.0", "--port", "8000"]
