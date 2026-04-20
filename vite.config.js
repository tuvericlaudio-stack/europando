import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const normalizeBasePath = (value = "/") => {
  if (value === "/") {
    return value;
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBasePath(env.VITE_SITE_BASE_PATH || "/europando/");

  return {
    plugins: [react(), tailwindcss()],
    base,
  };
});
