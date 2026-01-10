## Azure Procedure Requirements

1. Azure Subscription
2. Azure CLI (`az`)
3. Terraform CLI

---

## Pre-Requisite

> :warning: Ensure you are logged into Azure Portal with an IAM role that has **Owner or User Access Administrator** permissions.

### 1. **Create an Azure Tenant**

* Portal: [https://portal.azure.com](https://portal.azure.com)
* Docs: [https://learn.microsoft.com/azure/active-directory/fundamentals/active-directory-access-create-new-tenant](https://learn.microsoft.com/azure/active-directory/fundamentals/active-directory-access-create-new-tenant)

This establishes the **directory root**, used to manage multiple subscriptions.

---

### 2. **Create Subscriptions (Production & Development)**

* Portal: Azure Portal → **Subscriptions → Create**
* Docs: [https://learn.microsoft.com/azure/cost-management-billing/manage/create-subscription](https://learn.microsoft.com/azure/cost-management-billing/manage/create-subscription)

Create:

* **Developer Subscription**
* **Production Subscription**

---

### 3. Once Implemented We shall update next steps

---