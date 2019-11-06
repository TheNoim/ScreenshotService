# Simple Docker Screenshot service

A very simple http docker service to make screenshots of a website.

## HTTP API

### Advanced post method

POST /

Content-Type: application/json

```typescript
interface HTTPBody {
  url: string; // Required
  styles?: string[]; // CSS file urls getting injected
  scrollTo?: string; // CSS selector where the browser will scroll to
  hide?: string[]; // List of css selctors of elements getting hidden by the browser
  disableAnimations?: boolean /* = true */; // Disable css animations
  overlay?: OverlayOptions; // You can enable an optional overlay
}

interface OverlayOptions {
  browser?: 'safari-light' | 'safari-dark';
  background?: string; // CSS value for the background
}
```

#### Example body

```json
{
  "url": "https://google.com",
  "overlay": {
    "browser": "safari-dark"
  }
}
```

### More simple get method

GET /?url=<URL>

## Setup own docker container

Docker compose example. Runs on port 3000

```
version: '3.5'
services:
    screenshot:
        container_name: 'ScreenShotService'
        image: noim/screenshot:latest
        restart: always
        cap_add:
        - CAP_SYS_ADMIN
        - SYS_ADMIN
```
