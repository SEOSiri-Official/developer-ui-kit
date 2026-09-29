# SEOSiri Universal Developer UI Kit (`@seosiri/developer-ui-kit`)

> 📖 **Official Architecture & Documentation:** [SEOSiri Developer Portal](https://developers.seosiri.com/) | [Deep-Dive Guide](https://www.seosiri.com/2026/09/developer-ui-kit.html) | [Corporate Gateway](https://seosiri.com/)

A lightweight, framework-agnostic white-label React UI kit and licensing guard designed for software developers building enterprise tools, AI assistants, and SaaS dashboards. 

Featuring built-in **Flexible Licensing Guard** support (`PRO_` / `ENT_` token validation) to protect commercial software tiers and handle automated subscription expirations.

## Installation

```bash
npm install @seosiri/developer-ui-kit
```

## Quickstart

```javascript
import React from 'react';
import { UniversalSaaSWidget } from '@seosiri/developer-ui-kit';

export default function App() {
  return (
    <div style={{ padding: '40px', background: '#020617', minHeight: '100vh' }}>
      <UniversalSaaSWidget 
        productName="My SaaS Dashboard" 
        productVersion="1.2.0" 
        accentColor="#0284c7"
        theme="dark"
        storageKey="app_license_token"
        onProTask={() => alert('Pro feature executed!')}
      />
    </div>
  );
}
```

## Enterprise Features

* **Flexible Licensing Guard:** Instantly locks/unlocks premium features based on token prefixes (`PRO_` or `ENT_`).
* **Framework Agnostic:** Pure React with inline styling for zero-config compilation in Next.js, Vite, Electron, or custom web apps.
* **Enterprise Telemetry:** Built-in connection status telemetry and secure portal routing to SEOSiri enterprise documentation.

## License

Distributed under the [MIT License](https://github.com/SEOSiri-Official/developer-ui-kit/blob/main/LICENSE).


## ❤️ Sponsor This Project

If your organization relies on `@seosiri/developer-ui-kit` for commercial SaaS dashboards, enterprise tools, or AI control planes, you can support our ongoing maintenance and feature development through GitHub Sponsors:

- **Sponsor Development:** [GitHub Sponsors & Funding Portal](https://github.com/sponsors/SEOSiri-Official)
- **Official Funding Policy:** [.github/FUNDING.yml](.github/FUNDING.yml)
