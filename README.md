# 🚀 Jenkins + Docker CI/CD Pipeline (Momo Pasal)

This project demonstrates a **complete CI/CD pipeline** using **GitHub → Jenkins → Docker → Docker Hub → AWS EC2** for deploying a two-tier web application (Frontend + Backend).

---

## 🎯 Objectives

```
GitHub
  ↓
Jenkins Pipeline
  ↓
Docker Build (multi-stage)
  ↓
Push Images to Docker Hub
  ↓
SSH into EC2 (Ubuntu)
  ↓
Pull Latest Images
  ↓
Run Containers with Docker Compose
```

---

## 📁 Repository Structure

```
Momo_Pasal_Jenkins/
├── backend/
├── frontend/
├── docker-compose.yml
├── deploy.groovy
├── .gitignore
```

---

## ✅ Pre-requisites

- Working frontend & backend application
- AWS EC2 (Ubuntu)
- Docker & Docker Compose
- Jenkins with Docker support
- Docker Hub account

---

## 🖥️ Server Configuration (One-Time)

### Install Docker
https://docs.docker.com/engine/install/ubuntu/

### Allow Docker Without Sudo
```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

### Install Docker Compose
```bash
sudo apt-get install docker-compose-plugin
```

---

## 📦 Docker Compose (EC2)

```yaml
services:
  backend:
    image: karimshahid/backend:latest
    ports:
      - 4000:4000

  frontend:
    image: karimshahid/frontend:latest
    ports:
      - 80:80
    depends_on:
      - backend
```

---

## 🔐 Jenkins Credentials

- Docker Hub PAT → `dockerhub-creds`
- EC2 SSH Key → `ec2-ssh`

---

## ⚙️ Jenkins Pipeline

Pipeline script path:
```
deploy.groovy
```

### deploy.groovy (summary)
- Checkout code
- Build Docker images
- Push to Docker Hub
- SSH into EC2
- Deploy via Docker Compose

---

## ⚠️ Notes

- Ensure Docker is running on EC2
- Security group ports must be open
- Use `linux/amd64` builds for compatibility

---

## ✅ Result

- Images built & pushed
- Containers deployed on EC2
- App accessible via EC2 public IP

---

## 📌 Future Improvements

- Automated tests
- Image versioning
- Kubernetes deployment
