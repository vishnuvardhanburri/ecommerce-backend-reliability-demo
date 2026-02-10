# ADR-0001: Use Async Queue for Webhook Processing

## Status
Accepted

## Context

Ecommerce platforms frequently retry webhooks and external integrations may be slow or unreliable. Processing integrations directly in the HTTP request lifecycle can cause timeouts and degraded system performance.

## Decision

Webhook ingestion will:

- Validate payload
- Apply idempotency check
- Push work into an async queue (BullMQ)

Background workers will handle integrations and retries.

## Consequences

Pros:

- Fast API responses
- Improved reliability
- Failure isolation
- Easier retry handling

Cons:

- Increased architectural complexity
- Requires queue infrastructure
