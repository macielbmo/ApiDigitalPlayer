# Usando uma imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código da aplicação para o container
COPY . .

# Instala dependências de desenvolvimento
RUN npm install --only=dev

# Expõe a porta que o NestJS usará
EXPOSE 3010

# Comando para rodar a aplicação em modo de desenvolvimento com recarga automática
CMD ["npm", "run", "start:dev"]
