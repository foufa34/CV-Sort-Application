# Étape 1 : partir d'une image NGINX officielle
FROM nginx:alpine

# Étape 2 : copier les fichiers du build dans le dossier web de NGINX
COPY dist/ /usr/share/nginx/html

# Étape 3 : copier le fichier de config nginx (facultatif, voir ci-dessous)

# Étape 4 : exposer le port
EXPOSE 80

# NGINX démarre automatiquement avec l'image
