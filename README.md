> :warning: This project is for educational purposes only.

> :info: am also looking for a job so email me at [<ebartile@gmail.com>](mailto:<ebartile@gmail.com>). Only contact me if the compensation is reasonable.

# Paybill Platform Api

Paybill Platform Api is an **EKS-based Multi-Tenant SaaS solution** designed to deploy and manage control plane and tenant infrastructure in a secure, scalable, and GitOps-driven manner.

## CI/CD & Deployment Pipelines

The platform supports multiple CI/CD providers for deploying control plane infrastructure and applications:

- **AWS CodePipeline** (Production-ready)
- **Azure DevOps Pipelines** (Pending implementation)
- **Google Cloud Build + Cloud Deploy** (Pending implementation)
- **IBM DevOps** (Pending implementation)
- **Oracle DevOps Cloud Service** (Pending implementation)

## Control Plane Capabilities

The control plane is responsible for provisioning and managing:

- Networking
- Compute
- Databases
- Monitoring & Logging
- Security
- Control plane applications (deployed via Helm charts)

## Tenant Management & Onboarding

- Automatically provisions **tenant-specific CodeBuild projects**
- Supports onboarding of:
  - Silo tenants
  - Pooled tenants
- Each tenant has:
  - Dedicated infrastructure
  - Dedicated application Helm charts

## GitOps & Workflow Automation

- Tenant infrastructure and applications are managed using GitOps tools:
  - Argo CD
  - Argo Workflows

## Security & Isolation

- Enforces **strict IAM policies**
- Applies **Kubernetes Authorization Policies**
- Prevents **cross-namespace access** between tenants

<p align="center">
    <picture>
      <img src="./apps/platform-api/public/images/control-plane.png" alt="Low Level Architecture" />
    </picture>
</p>

<p align="center">
    <picture>
      <img src="./apps/platform-api/public/images/high-level-arch.png" alt="High Level Architecture" />
    </picture>
</p>

## AWS Procedure Requirements

For more details, you can go through the [aws documentation](./terraform/aws/README.md).

## Azure Procedure Requirements

For more details, you can go through the [azure documentation](./terraform/azure/README.md).

## GCP Procedure Requirements

For more details, you can go through the [gcp documentation](./terraform/gcp/README.md).

## IBM Procedure Requirements

For more details, you can go through the [ibm documentation](./terraform/ibm/README.md).

## Oracle Procedure Requirements

For more details, you can go through the [oracle documentation](./terraform/oracle/README.md).
