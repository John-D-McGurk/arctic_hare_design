import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://arcticharedesign.no",
  integrations: [
    sitemap(),
    partytown({
      config: {
        resolveUrl: function(url) {
          if (url.hostname === "connect.facebook.net") {
            var proxyUrl = new URL('https://my-reverse-proxy.com/');
            proxyUrl.searchParams.append('url', url.href);
            return proxyUrl;
          }
          return url;
        },
        forward: ["dataLayer.push", "fbq"],
      },
    }),
  ],
});
