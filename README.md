# SEOSiri Universal Developer UI Kit (`@seosiri/developer-ui-kit`)

> 📖 **Official Architecture & Documentation:** [SEOSiri Developer Portal](https://developers.seosiri.com/) | [Deep-Dive Guide](https://www.seosiri.com/2026/09/developer-ui-kit.html) | [Corporate Gateway](https://seosiri.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SEOSiri-Official/developer-ui-kit/blob/main/LICENSE)

A lightweight, framework-agnostic white-label React UI kit and licensing guard designed for software developers building enterprise tools, AI assistants, and SaaS dashboards. Features built-in **Flexible Licensing Guard** support (`PRO_` / `ENT_` token validation) to protect commercial software tiers.

## Installation

```bash
npm install @seosiri/developer-ui-kit
```

## Quickstart

```tsx
import React from 'react';
import { UniversalSaaSWidget } from '@seosiri/developer-ui-kit';

export default function App() {
  return (
    <div style={{ padding: '40px' }}>
      <UniversalSaaSWidget 
        productName="My SaaS Dashboard"
        productVersion="1.2.0"
        accentColor="#2563eb"
        onProTask={() => alert('Pro feature executed!')}
      />
    </div>
  );
}
```

## Enterprise Features

* **Flexible Licensing Guard**: Instantly locks/unlocks premium features based on token prefixes (`PRO_` or `ENT_`).
* **Framework Agnostic**: Pure React with inline styling for zero-config compilation in Next.js, Vite, Electron, or custom web apps.
* **Enterprise Telemetry**: Built-in connection status telemetry and direct backlink routing to SEOSiri architecture hubs.

## License

Distributed under the MIT License.
