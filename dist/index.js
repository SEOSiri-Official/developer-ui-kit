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
  productVersion = "1.0.0",
  logoInitial = "S",
  accentColor = "#2563eb",
  theme = "dark",
  storageKey = "app_license_token",
  onValidateToken,
  onProTask
}) => {
  const [isLicensed, setIsLicensed] = (0, import_react.useState)(false);
  const [tier, setTier] = (0, import_react.useState)("FREE");
  const [inputToken, setInputToken] = (0, import_react.useState)("");
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [message, setMessage] = (0, import_react.useState)("Standard License Active");
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
  }, [storageKey]);
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
        setMessage(`${detectedTier} License Activated Successfully`);
        localStorage.setItem(storageKey, token);
        setInputToken("");
      } else {
        setMessage("Invalid License Key");
      }
    } catch (err) {
      setMessage("Validation Error");
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
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { style: {
    padding: "20px",
    background: isDark ? "#090d16" : "#ffffff",
    color: isDark ? "#f8fafc" : "#0f172a",
    borderRadius: "14px",
    border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
  } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, paddingBottom: "12px", marginBottom: "14px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "32px", height: "32px", background: accentColor, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#fff" } }, logoInitial), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h4", { style: { margin: 0, fontSize: "14px", fontWeight: 700 } }, productName), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: "11px", color: "#64748b", fontFamily: "monospace" } }, "v", productVersion))), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: "10px", padding: "3px 8px", background: isLicensed ? "#065f46" : "#1e293b", color: isLicensed ? "#34d399" : "#94a3b8", borderRadius: "999px", fontFamily: "monospace", fontWeight: 700 } }, tier)), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: isDark ? "#020617" : "#f8fafc", padding: "10px", borderRadius: "8px", marginBottom: "14px", fontSize: "12px", fontFamily: "monospace", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { color: "#64748b", display: "block", fontSize: "10px", textTransform: "uppercase" } }, "License Status"), /* @__PURE__ */ import_react.default.createElement("strong", { style: { color: isLicensed ? "#34d399" : "#38bdf8" } }, message)), !isLicensed ? /* @__PURE__ */ import_react.default.createElement("form", { onSubmit: handleActivate, style: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" } }, /* @__PURE__ */ import_react.default.createElement("label", { style: { fontSize: "11px", color: "#94a3b8" } }, "Enter commercial license key:"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: "6px" } }, /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      type: "text",
      placeholder: "PRO_XXXXXX or ENT_XXXXXX",
      value: inputToken,
      onChange: (e) => setInputToken(e.target.value),
      style: { flex: 1, padding: "8px 10px", background: isDark ? "#020617" : "#fff", color: isDark ? "#fff" : "#000", border: `1px solid ${isDark ? "#334155" : "#cbd5e1"}`, borderRadius: "6px", fontSize: "12px", fontFamily: "monospace" }
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      type: "submit",
      disabled: loading,
      style: { padding: "8px 14px", background: accentColor, color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }
    },
    loading ? "..." : "Verify"
  ))) : /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: "14px" } }, /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      onClick: () => onProTask && onProTask(),
      style: { width: "100%", padding: "10px", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", marginBottom: "8px" }
    },
    "Execute Pro Feature \u26A1"
  ), /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: handleRevoke, style: { background: "none", border: "none", color: "#64748b", fontSize: "11px", textDecoration: "underline", cursor: "pointer", fontFamily: "monospace" } }, "Revoke License"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { borderTop: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "#475569", fontFamily: "monospace" } }, /* @__PURE__ */ import_react.default.createElement("span", null, "Secured by SEOSiri Guard"), /* @__PURE__ */ import_react.default.createElement("a", { href: "https://developers.seosiri.com", target: "_blank", rel: "noreferrer", style: { color: accentColor, textDecoration: "none" } }, "API Docs")));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniversalSaaSWidget
});
