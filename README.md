# Ecommerce Backend Reliability Demo

Production-style backend reliability service demonstrating resilient webhook processing, async workflows, monitoring-first architecture, and failure-safe integrations commonly required in ecommerce systems.

---

## High-Level Architecture

```mermaid
flowchart LR
    Platform[Ecommerce Platform] -->|Webhook Event| API[Webhook API Layer]
    API --> Validation[Payload Validation]
    Validation --> Idempotency[Idempotency Guard]
    Idempotency --> Queue[Async Queue BullMQ]
    Queue --> Worker[Background Worker]
    Worker --> Integration[Integration Adapter Layer]
    Integration --> External[Third Party APIs]
    API --> Logs[Structured Logging]
    Worker --> Logs
    API --> Health[Health Endpoint]
```

---

## Event Processing Flow

```mermaid
sequenceDiagram
    participant Platform
    participant API
    participant Queue
    participant Worker
    participant External

    Platform->>API: Send webhook
    API->>API: Validate + Idempotency
    API->>Queue: Push async job
    API-->>Platform: Immediate ACK

    Queue->>Worker: Deliver job
    Worker->>External: API request

    alt Success
        External-->>Worker: Success
        Worker->>Worker: Log success
    else Failure
        External-->>Worker: Error
        Worker->>Worker: Log failure
        Worker->>Queue: Retry
    end
```

---

## Production Deployment Architecture

```mermaid
flowchart TD
    Internet --> LoadBalancer
    LoadBalancer --> APIService[API Container]
    APIService --> Redis[Redis Queue Backend]
    APIService --> Logging[Log Aggregation]
    WorkerService[Worker Container] --> Redis
    WorkerService --> ExternalServices[External APIs]
    APIService --> HealthChecks
```

---

## Observability Architecture

```mermaid
flowchart LR
    Application --> StructuredLogs
    StructuredLogs --> LogAggregation
    LogAggregation --> Monitoring
    Monitoring --> Alerting
```

---

## Architecture Principles

### Failure-First Design

System assumes:

- Duplicate webhook delivery
- External API downtime
- Network latency or timeout
- Partial system failures

Mitigation:

- Idempotency protection
- Async processing
- Retry-safe integration layer

---

### Async Processing

HTTP layer:

- Validate request
- Enforce idempotency
- Queue work
- Respond immediately

Worker layer:

- Process integrations
- Handle retries
- Log outcomes

---

### Integration Isolation

External services wrapped behind adapters:

- Centralized timeout handling
- Consistent error structure
- Retry-ready logic

---

### Observability-First

Structured logs provide:

- Request tracing
- Debuggable failures
- Operational clarity

---

## Real-world Failure Scenarios

- Duplicate webhook retries handled via idempotency.
- External API failures isolated via worker queue.
- Slow integrations prevented from blocking API layer.
- Structured logs support debugging.

---

## Project Structure

```
src/
api/
routes/
middleware/
queue/
workers/
integrations/
docs/
```

---

## Local Setup

Clone:

```
git clone https://github.com/vishnuvardhanburri/ecommerce-backend-reliability-demo.git
```

Install:

```
npm install
```

Start:

```
docker-compose up
npm start
```

---

## Health Check

GET /health

```
{ "status": "ok" }
```
