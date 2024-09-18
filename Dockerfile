FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
RUN npm i
RUN npx cypress install # Install Cypress binary into image
