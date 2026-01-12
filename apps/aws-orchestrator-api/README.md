<p align="center">
  <a href="https://paybill.dev" target="_blank">
    <picture>
      <!-- Dark mode -->
      <source srcset="https://paybill.dev/logo-wordmark--dark.png" media="(prefers-color-scheme: dark)" />
      <!-- Light mode (default) -->
      <img src="https://paybill.dev/logo-wordmark--light.png" width="180" alt="Logo" />
    </picture>
  </a>
</p>

**Paybill** builds foundational platforms for **modern SaaS systems** and **safe AI-driven applications**.

We focus on **control, predictability, and security** — enabling platforms and agents to operate within clearly defined boundaries rather than unchecked automation.

# Orchestrator API

## Overview

The Orchestrator API is a backend service responsible for coordinating and managing the full lifecycle of tenant operations in a SaaS environment. It acts as the central event-driven controller that reacts to AWS EventBridge events and triggers the appropriate infrastructure, provisioning, deployment, and callback workflows.

The service is built on Fastify and exposes a REST API that receives cloud events, validates them using OpenAPI/Zod schemas, and routes them to specialized handlers based on the event type.

This project is designed to be used as the control plane component in a multi-tenant SaaS platform.

---

## What This Service Does

### 1. Event-Driven Orchestration

The API listens for AWS EventBridge-style events and processes them through a single endpoint:

* Receives tenant lifecycle events
* Determines the event type
* Dispatches the event to the correct handler
* Orchestrates downstream systems such as:

  * AWS CodeBuild
  * DynamoDB
  * External service callbacks
  * Application plane bootstrap services

Supported event types include:

* Tenant Provisioning
* Tenant Deprovisioning
* Provisioning Success
* Provisioning Failure
* Tenant Deployment

Each event type has a dedicated provider class responsible for executing the correct business workflow.

---

### 2. Tenant Provisioning Flow

When a tenant provisioning event is received:

1. Tenant and plan information is stored in DynamoDB.
2. Tier configuration is resolved from a tier-mapping table.
3. A build job is selected dynamically.
4. AWS CodeBuild is triggered with environment variables derived from:

   * Plan configuration
   * Tier details
   * Builder overrides

This allows infrastructure and application stacks to be built automatically per tenant.

---

### 3. Deployment & Callback Handling

After provisioning succeeds:

* A deployment event is emitted to EventBridge.
* The orchestrator:

  * Retrieves tenant data from DynamoDB
  * Builds signed webhook payloads
  * Calls:

    * Application plane bootstrap endpoints
    * Feature service bootstrap endpoints
    * External system webhooks
  * Uses HMAC signatures and timestamps for secure callbacks

This ensures downstream systems are notified and initialized in the correct order.

---

### 4. Data Persistence

The Orchestrator stores and retrieves tenant provisioning state from DynamoDB:

* Provisioning requests
* Plan configuration
* Tenant identifiers
* Tier metadata

This allows stateless event processing while maintaining full workflow context.

---

### 5. OpenAPI & Validation

The API automatically exposes:

* OpenAPI documentation
* JSON Schema validation for AWS EventBridge payloads
* Strong typing via Zod and TypeScript

This guarantees that only valid cloud events are processed.

---

### 6. Health & Status Endpoint

A status endpoint is available for infrastructure health checks and monitoring integration.

---

## Typical Use Cases

* SaaS tenant onboarding automation
* Infrastructure-as-code orchestration
* CI/CD pipeline triggering via cloud events
* Secure webhook coordination
* Multi-environment tenant deployment flows
* Event-driven control plane for microservice platforms

---

## Running the Service

### Development

```
npm run dev
```

### Production

```
npm run start
```

---

## Architecture Summary

| Component            | Responsibility                         |
| -------------------- | -------------------------------------- |
| Fastify API          | Receives and validates events          |
| Orchestrator Service | Routes events to handlers              |
| Event Providers      | Execute tenant lifecycle workflows     |
| DynamoDB             | Stores tenant and plan state           |
| CodeBuild            | Executes infrastructure and app builds |
| EventBridge          | Drives asynchronous orchestration      |
| Webhook Engine       | Notifies downstream systems securely   |
| OpenAPI              | Documentation & contract validation    |

---

## Designed For

* Cloud-native SaaS platforms
* Event-driven microservice ecosystems
* Infrastructure automation teams
* Platform engineering and DevOps pipelines

This Orchestrator serves as the brain of the tenant lifecycle, ensuring every provisioning, deployment, and callback happens reliably, securely, and in the correct sequence.
