# Secure Multi-Tier Web Application Infrastructure

## 📌 Project Overview
This project demonstrates a **production-lite architecture** for a secure multi-tier web application on Microsoft Azure.  
It includes governance (RBAC, Policy), networking (VNets, NSGs, Private Endpoints), compute (App Service), data (SQL Database), monitoring, and backup.  
The goal is to showcase **real-world cloud engineering practices** in a compact, deployable solution.

---

## 🏗 Architecture

### Components
- **Management Group + Resource Group**:  
  - `kansure-mg` (management group)  
  - `kansure-prod-rg` (resource group)

- **Governance**:  
  - RBAC roles (Contributor, Storage Blob Data Contributor)  
  - Azure Policy (require tags, restrict allowed locations)

- **Networking**:  
  - VNet: `kansure-vnet (10.0.0.0/16)`  
  - Subnets:  
    - `web-subnet (10.0.1.0/24)`  
    - `app-subnet (10.0.2.0/24)`  
    - `data-subnet (10.0.3.0/24)`  
  - NSGs applied to each subnet  
  - Private Endpoint for SQL Database

- **Web Tier**:  
  - Azure App Service (`kansure-web-prod`)  
  - Deployment slots: `production` (v1), `staging` (v2)

- **Data Tier**:  
  - Azure SQL Database (`kansuredb`)  
  - Public access disabled, private endpoint only

- **Security**:  
  - NSGs for subnet isolation  
  - RBAC for least privilege  
  - Azure Policy for compliance

- **Monitoring & Backup**:  
  - Azure Monitor + Application Insights  
  - Alerts for CPU, errors, and cost  
  - Backup Storage Account for App Service  
  - SQL Database long-term retention

---

## 🎨 Architecture Diagram
![Architecture](docs/architecture-diagram.png)

---

## 🚀 Deployment Steps

### 1. Governance
- Create management group and resource group.
- Assign RBAC roles.
- Apply Azure Policy (tags + allowed locations).

### 2. Networking
- Create VNet and subnets.
- Apply NSGs to subnets.
- Configure Private Endpoint for SQL Database.

### 3. Web Tier
- Create App Service Plan and Web App.
- Add deployment slot (`staging`).
- Deploy v1 to production, v2 to staging.

### 4. Data Tier
- Create SQL Server and Database.
- Disable public access.
- Configure Private Endpoint + DNS zone.

### 5. Monitoring & Alerts
- Enable Application Insights.
- Create alerts for CPU > 80%, failed requests > 10, monthly cost > $100.

### 6. Backup
- Configure App Service backup to Storage Account.
- Configure SQL Database long-term retention.

---

## 🔄 CI/CD Pipeline
GitHub Actions workflow (`.github/workflows/deploy.yml`):
- Push to `main` → deploy to **production slot**.
- Push to `staging` → deploy to **staging slot**.
- Slot swap for zero-downtime release.

---

## 📊 Monitoring & Alerts
- **CPU Alert**: triggers if average CPU > 80% for 5 minutes.  
- **Error Alert**: triggers if failed requests > 10 in 5 minutes.  
- **Cost Alert**: triggers if monthly spend > $100.

---

## 💾 Backup Strategy
- **Web App**: daily backup to Storage Account.  
- **SQL Database**: weekly, monthly, yearly retention configured.

---

## 📂 Repository Structure
