#!/bin/bash

# FilePeer VPS Setup Script
# This script helps set up FilePeer on a fresh Ubuntu/Debian VPS

# Exit on error
set -e

echo "=== FilePeer VPS Setup Script ==="
echo "This script will install Java, Node.js, Nginx, and set up FilePeer."

# Update system
echo "Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install Java
echo "Installing Java..."
sudo apt install -y openjdk-17-jdk

# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
echo "Installing Nginx..."
sudo apt install -y nginx

# Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

# Install Maven
echo "Installing Maven..."
sudo apt install -y maven

# Clone repository
echo "Cloning repository..."
git clone https://github.com/ShivMane/FilePeer
cd FilePeer

# Build backend
echo "Building Java backend..."
mvn clean package

# Build frontend
echo "Building frontend..."
cd ui
npm install
npm run build
cd ..

# Set up Nginx
echo "Setting up Nginx..."

# Remove default site
if [ -e /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
    echo "Removed default Nginx site configuration."
fi

# Create the filepeer configuration
echo "Creating /etc/nginx/sites-available/filepeer..."
cat <<EOF | sudo tee /etc/nginx/sites-available/filepeer
server {
    listen 80;
    server_name _; # Catch-all for HTTP requests

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Additional security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
}
EOF

# Enable the filepeer site
sudo ln -sf /etc/nginx/sites-available/filepeer /etc/nginx/sites-enabled/filepeer

sudo nginx -t
if [ $? -eq 0 ]; then
    sudo systemctl restart nginx
    echo "Nginx configured and restarted successfully."
else
    echo "Nginx configuration test failed."
    exit 1
fi

# Optional: SSL with Let's Encrypt (uncomment when domain ready)
# sudo apt install -y certbot python3-certbot-nginx
# sudo certbot --nginx -d your-domain.com

# Start backend with PM2
echo "Starting backend with PM2..."
CLASSPATH="target/p2p-1.0-SNAPSHOT.jar:$(mvn dependency:build-classpath -DincludeScope=runtime -Dmdep.outputFile=/dev/stdout -q)"
pm2 start --name filepeer-backend java -- -cp "$CLASSPATH" p2p.App

# Start frontend with PM2
echo "Starting frontend with PM2..."
cd ui
pm2 start npm --name filepeer-frontend -- start
cd ..

# Save PM2 process list
pm2 save

# Enable PM2 to start on boot
pm2 startup
# (Follow the printed instruction here)

echo "=== Setup Complete ==="
echo "FilePeer is now running on your VPS!"
echo "Backend API: http://localhost:8080"
echo "Frontend: http://<your-instance-ip>"
