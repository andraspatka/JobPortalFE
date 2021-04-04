#!/bin/bash
echo "Installing Heroku CLI"
curl https://cli-assets.heroku.com/install.sh | sh

ng build --prod

echo "Logging into Heroku container registry"
heroku container:login

echo "Building and pushing docker image"
heroku container:push web --app $HEROKU_APP

echo "Deploying..."
heroku container:release web --app $HEROKU_APP
echo "Deployment successful."
