# Deploy strapi v5 to EC2 with nginx & ssl

Deploying Strapi v5 with PostgreSQL and Nginx with SSL on AWS EC2 using Docker and GitHub Actions involves several steps. This guide assumes you have a basic understanding of AWS EC2, Docker, Nginx, and GitHub Actions.

## Deploy Strapi

### Step 1: Prepare Your AWS EC2 Instance

1. **Launch an EC2 Instance**: Choose an instance type and Amazon Linux 2 AMI.
2. **Configure Security Group**: Ensure your security group allows inbound traffic on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS).
3. **SSH into Your Instance**: After the instance is up, connect to it via SSH.

### Step 2: Install Docker and Docker Compose on EC2

1. **Update Your Instance**:

   ```bash
   sudo yum update -y
   ```

2. **Install Docker**:

   ```bash
   sudo amazon-linux-extras install docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   ```

3. **Install Docker Compose**:

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Logout and Login Again** to apply the Docker group changes.

### Step 3: Prepare Your Application for Deployment

1. **Strapi Application**: Ensure your Strapi v5 application is ready for deployment. Include a `Dockerfile` in your project root.
2. **Docker Compose**: Create a [`docker-compose.yml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmagnus%2FDev%2Fgolf-training-pwa%2Fdocker-compose.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/magnus/Dev/golf-training-pwa/docker-compose.yml") file in your project root to define services: Strapi, PostgreSQL, and Nginx.

#### Example `Dockerfile` for Strapi

```Dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

#### Example `docker-compose.yml`

```yaml
version: '3'
services:
  strapi:
    container_name: strapi
    build: .
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_NAME: strapi
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    ports:
      - "1337:1337"
    depends_on:
      - postgres
    networks:
      - strapi-net

  postgres:
    container_name: postgres
    image: postgres
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - strapi-net

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./path/to/your/nginx/conf:/etc/nginx/conf.d
      - ./path/to/your/ssl/certs:/etc/ssl/certs:ro
    depends_on:
      - strapi
    networks:
      - strapi-net

networks:
  strapi-net:
    driver: bridge

volumes:
  pgdata:
```

### Step 4: Configure Nginx and SSL

1. **Nginx Configuration**: Create an Nginx configuration file for your Strapi application. Ensure it's set up to serve Strapi on port 1337 and configured to handle SSL certificates.
2. **SSL Certificates**: Obtain SSL certificates for your domain, e.g., using Let's Encrypt with Certbot.

### Step 5: Set Up GitHub Actions for Deployment

1. **GitHub Secrets**: In your repository settings, add secrets for `SSH_KEY` (your EC2 SSH private key), `HOST` (your EC2 instance's public IP or domain), and any other sensitive information.
2. **GitHub Actions Workflow**: Create a `.github/workflows/deploy.yml` file in your repository.

#### Example GitHub Actions Workflow

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Deploy to EC2
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ec2-user
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /path/to/your/project
          git pull
          docker-compose down
          docker-compose up --build -d
```

### Step 6: Deploy Your Application

Push your changes to the `main` branch. This will trigger the GitHub Actions workflow, which will deploy your Strapi application to your EC2 instance using Docker and Docker Compose.

### Additional Notes

- **Database Persistence**: The PostgreSQL data is persisted in a Docker volume (`pgdata`). Ensure you back up this data regularly.
- **Security**: Regularly update your Docker images and EC2 instance for security patches.
- **Domain Configuration**: Point your domain to your EC2 instance's IP and configure Nginx to use your domain.

This guide provides a basic overview. Depending on your specific requirements, you may need to adjust configurations and commands.

## Configure SSL nginx

Configuring SSL certificates for Nginx on an AWS EC2 instance typically involves obtaining a certificate, either from a Certificate Authority (CA) like Let's Encrypt or by purchasing one, and then configuring Nginx to use the certificate. Here's a step-by-step guide focusing on using Let's Encrypt, which provides free SSL certificates.

### Step 1: Connect to Your EC2 Instance

- SSH into your EC2 instance:

  ```bash
  ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-dns.amazonaws.com
  ```

### Step 2: Install Certbot

Certbot is a free tool that simplifies the process of obtaining and renewing certificates from Let's Encrypt.

- For Amazon Linux 2:

  ```bash
  sudo yum install -y certbot python2-certbot-nginx
  ```

### Step 3: Obtain a Certificate

- Run Certbot for Nginx to automatically obtain and install the certificate:

  ```bash
  sudo certbot --nginx
  ```

- Follow the on-screen instructions. Certbot will ask for information and if you want to redirect HTTP traffic to HTTPS, which is recommended.

### Step 4: Verify Certbot Auto-Renewal

Let's Encrypt certificates are valid for 90 days. Certbot can automatically renew them.

- Test the renewal process with:

  ```bash
  sudo certbot renew --dry-run
  ```

### Step 5: Configure Nginx to Use SSL

If you let Certbot configure Nginx automatically, it should have already set up SSL for you. However, if you need to do it manually or make adjustments, here's how you can configure Nginx to use the SSL certificate.

1. **Edit Your Nginx Configuration**:
   - Open your Nginx server block configuration. This is usually located in `/etc/nginx/nginx.conf` or `/etc/nginx/sites-available/your-domain`.
   - Ensure the server block listens on port 443 and references your SSL certificate and key. Replace `your-domain.com` with your actual domain name.

     ```nginx
     server {
         listen 443 ssl;
         server_name your-domain.com www.your-domain.com;

         ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
         ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

         # Additional SSL settings...
         ssl_session_cache shared:SSL:1m;
         ssl_session_timeout  10m;
         ssl_ciphers HIGH:!aNULL:!MD5;
         ssl_prefer_server_ciphers on;

         # Your server's location block and other configurations...
     }
     ```

2. **Redirect HTTP to HTTPS** (optional but recommended):
   - Add a server block to listen on port 80 and redirect all traffic to HTTPS:

     ```nginx
     server {
         listen 80;
         server_name your-domain.com www.your-domain.com;

         location / {
             return 301 https://$server_name$request_uri;
         }
     }
     ```

3. **Test and Reload Nginx Configuration**:
   - Test your Nginx configuration for syntax errors:

     ```bash
     sudo nginx -t
     ```

   - If the test is successful, reload Nginx to apply the changes:

     ```bash
     sudo systemctl reload nginx
     ```

### Step 6: Verify HTTPS

- After configuring SSL and reloading Nginx, visit your website using `https://` to verify that SSL is working correctly.
- You can also use online tools like SSL Labs' SSL Test to check your site's SSL configuration.

This guide provides a basic overview of setting up SSL with Let's Encrypt and Nginx on an AWS EC2 instance. Depending on your specific setup and requirements, additional configuration may be necessary.
