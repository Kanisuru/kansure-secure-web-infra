# Operations Runbook - Secure Multi-Tier Web Application Infrastructure

## 📌 Purpose
This runbook provides step-by-step instructions for operating, monitoring, and troubleshooting the **Kansure Secure Web Infrastructure**.  
It covers daily checks, incident response, backup/restore, and escalation paths.

---

## 🏗 System Overview
- **Web Tier**: Azure App Service (`kansure-web-prod`) with production + staging slots.
- **Data Tier**: Azure SQL Database (`kansuredb`) with Private Endpoint.
- **Networking**: VNet (`kansure-vnet`) with subnets (Web, App, Data) and NSGs.
- **Governance**: RBAC + Azure Policy.
- **Monitoring**: Azure Monitor + Application Insights.
- **Backup**: Storage Account for App Service backups + SQL LTR backups.

---

## 🔍 Daily Operations Checklist
- Verify App Service is running (`az webapp show`).
- Check SQL Database connectivity (`az sql db show`).
- Review Azure Monitor dashboard for CPU, errors, and cost.
- Confirm backups completed successfully (App Service + SQL).
- Ensure RBAC assignments are correct (least privilege).
- Validate NSG rules are intact (no accidental changes).

---

## 🚨 Incident Response Scenarios

### 1. High CPU Usage
- **Alert Triggered**: CPU > 80% for 5 minutes.
- **Action**:
  1. Scale App Service Plan (`az appservice plan update --sku S2`).
  2. Check logs in Application Insights for traffic spikes.
  3. If attack suspected → enable WAF rules in Application Gateway.

### 2. Application Errors (HTTP 500s)
- **Alert Triggered**: Failed requests > 10 in 5 minutes.
- **Action**:
  1. Review staging slot logs (`az webapp log tail --slot staging`).
  2. If fix exists in staging → swap slots (`az webapp deployment slot swap`).
  3. Roll back if errors persist.

### 3. SQL Database Connectivity Failure
- **Alert Triggered**: App Service cannot connect to SQL.
- **Action**:
  1. Verify Private Endpoint status (`az network private-endpoint show`).
  2. Check NSG rules on `data-subnet`.
  3. Failover to geo-redundant backup if outage persists.

### 4. Cost Overrun
- **Alert Triggered**: Monthly spend > $100.
- **Action**:
  1. Review Azure Cost Analysis.
  2. Identify expensive resources (e.g., scaling, unused VMs).
  3. Adjust SKU or deallocate unused resources.

---

## 💾 Backup & Restore Procedures

### Web App Backup
- **Daily backup** stored in Storage Account.
- **Restore**:
  ```bash
  az webapp config backup restore \
    --resource-group kansure-prod-rg \
    --webapp-name kansure-web-prod \
    --backup-name <backup-id> \
    --storage-account-url <storage-url>
