# Install mkcert for creating a valid certificate (Mac OS)
brew install mkcert
mkcert -install
mkcert localhost

# Then install and run the proxy
npm install -g local-ssl-proxy
yarn https-dev
        