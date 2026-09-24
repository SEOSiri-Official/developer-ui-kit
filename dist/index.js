"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  UniversalSaaSWidget: () => UniversalSaaSWidget
});
module.exports = __toCommonJS(index_exports);

// src/components/UniversalSaaSWidget.tsx
var import_react = __toESM(require("react"));
var UniversalSaaSWidget = ({
  productName,
  productVersion = "1.0.1",
  logoInitial = "S",
  accentColor = "#0284c7",
  theme = "dark",
  storageKey = "seosiri_app_license_token",
  mcpEndpoint,
  onValidateToken,
  onProTask,
  onTelemetryEvent
}) => {
  const [isLicensed, setIsLicensed] = (0, import_react.useState)(false);
  const [tier, setTier] = (0, import_react.useState)("FREE");
  const [inputToken, setInputToken] = (0, import_react.useState)("");
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [message, setMessage] = (0, import_react.useState)("Standard License Active");
  const [latency, setLatency] = (0, import_react.useState)(null);
  const isDark = theme === "dark";
  (0, import_react.useEffect)(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        if (saved.startsWith("ENT_")) {
          setIsLicensed(true);
          setTier("ENTERPRISE");
          setMessage("Enterprise License Verified");
        } else if (saved.startsWith("PRO_")) {
          setIsLicensed(true);
          setTier("PRO");
          setMessage("Pro License Verified");
        }
      }
    } catch (e) {
    }
    if (mcpEndpoint) {
      const start = Date.now();
      fetch(`${mcpEndpoint}/health`).then((res) => {
        if (res.ok) {
          setLatency(Date.now() - start);
          setMessage((prev) => `${prev} \u2022 Gateway Connected`);
        }
      }).catch(() => {
        setMessage((prev) => `${prev} \u2022 Gateway Offline`);
      });
    }
  }, [storageKey, mcpEndpoint]);
  const emitTelemetry = (type, payload) => {
    if (onTelemetryEvent) {
      onTelemetryEvent({ type, payload, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    }
  };
  const handleActivate = async (e) => {
    e.preventDefault();
    const token = inputToken.trim();
    if (!token) return;
    setLoading(true);
    try {
      let isValid = false;
      if (onValidateToken) {
        isValid = await onValidateToken(token);
      } else {
        isValid = token.startsWith("PRO_") || token.startsWith("ENT_");
      }
      if (isValid) {
        const detectedTier = token.startsWith("ENT_") ? "ENTERPRISE" : "PRO";
        setIsLicensed(true);
        setTier(detectedTier);
        setMessage(`${detectedTier} License Activated`);
        localStorage.setItem(storageKey, token);
        setInputToken("");
        emitTelemetry("LICENSE_ACTIVATED", { tier: detectedTier });
      } else {
        setMessage("Invalid License Key");
        emitTelemetry("LICENSE_REJECTED", { tokenPrefix: token.substring(0, 4) });
      }
    } catch (err) {
      setMessage("Validation Exception");
    } finally {
      setLoading(false);
    }
  };
  const handleRevoke = () => {
    setIsLicensed(false);
    setTier("FREE");
    setMessage("License Revoked");
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
    }
    emitTelemetry("LICENSE_REVOKED", {});
  };
  const handleDownloadMcpConfig = () => {
    const configData = {
      mcpServers: {
        [productName.toLowerCase().replace(/\s+/g, "-")]: {
          command: mcpEndpoint?.includes("rovomcp") ? "npx" : "uvx",
          args: mcpEndpoint ? [mcpEndpoint + "/sse"] : ["@seosiri/biopharma-mcp"],
          env: {
            X_SEOSIRI_KEY: localStorage.getItem(storageKey) || "FREE_TIER"
          }
        }
      }
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcp_client_config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    emitTelemetry("CONFIG_DOWNLOADED", {});
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { style: {
    padding: "20px",
    background: isDark ? "#0f172a" : "#ffffff",
    color: isDark ? "#f8fafc" : "#0f172a",
    borderRadius: "14px",
    border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: "420px",
    width: "100%",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
  } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`, paddingBottom: "12px", marginBottom: "14px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "32px", height: "32px", background: `linear-gradient(135deg, ${accentColor}, #059669)`, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#fff", fontSize: "15px" } }, logoInitial), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h4", { style: { margin: 0, fontSize: "14px", fontWeight: 800 } }, productName), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" } }, "v", productVersion, " ", latency !== null ? `\u2022 ${latency}ms` : ""))), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: "10px", padding: "3px 10px", background: isLicensed ? "#065f46" : isDark ? "#1e293b" : "#f1f5f9", color: isLicensed ? "#34d399" : "#64748b", borderRadius: "999px", fontFamily: "monospace", fontWeight: 700 } }, tier)), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: isDark ? "#1e293b" : "#f8fafc", padding: "10px 12px", borderRadius: "8px", marginBottom: "14px", fontSize: "12px", fontFamily: "monospace", border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}` } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { color: "#94a3b8", display: "block", fontSize: "10px", textTransform: "uppercase", marginBottom: "2px" } }, "System Telemetry"), /* @__PURE__ */ import_react.default.createElement("strong", { style: { color: isDark ? "#38bdf8" : "#0284c7" } }, message)), !isLicensed ? /* @__PURE__ */ import_react.default.createElement("form", { onSubmit: handleActivate, style: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" } }, /* @__PURE__ */ import_react.default.createElement("label", { style: { fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" } }, "Enter Enterprise License Token:"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: "6px" } }, /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      type: "text",
      placeholder: "PRO_... or ENT_...",
      value: inputToken,
      onChange: (e) => setInputToken(e.target.value),
      style: { flex: 1, padding: "9px 12px", background: isDark ? "#020617" : "#fff", color: isDark ? "#fff" : "#000", border: `1px solid ${isDark ? "#475569" : "#cbd5e1"}`, borderRadius: "6px", fontSize: "12px", fontFamily: "monospace" }
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      type: "submit",
      disabled: loading,
      style: { padding: "9px 14px", background: accentColor, color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }
    },
    loading ? "..." : "Verify"
  ))) : /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" } }, /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      onClick: () => {
        if (onProTask) onProTask();
        emitTelemetry("PRO_TASK_EXECUTED", {});
      },
      style: { width: "100%", padding: "10px", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }
    },
    "Execute Pro Pipeline Task \u26A1"
  ), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" } }, /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      onClick: handleDownloadMcpConfig,
      style: { background: "none", border: "none", color: "#38bdf8", fontSize: "11px", textDecoration: "underline", cursor: "pointer", fontFamily: "monospace" }
    },
    "Download mcp.json Config"
  ), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      onClick: handleRevoke,
      style: { background: "none", border: "none", color: "#64748b", fontSize: "11px", textDecoration: "underline", cursor: "pointer", fontFamily: "monospace" }
    },
    "Revoke License"
  ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { borderTop: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`, paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "#64748b", fontFamily: "monospace" } }, /* @__PURE__ */ import_react.default.createElement("span", null, "SEOSiri UI Kit v1.0.2"), /* @__PURE__ */ import_react.default.createElement("a", { href: "https://developers.seosiri.com", target: "_blank", rel: "noreferrer", style: { color: accentColor, textDecoration: "none", fontWeight: 600 } }, "developers.seosiri.com \u2192")));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniversalSaaSWidget
});
