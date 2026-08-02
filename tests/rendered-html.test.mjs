import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Aharon Berk entry page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Aharon Berk \| Weddings &amp; Music<\/title>/i,
  );
  assert.match(html, /Choose an experience/i);
  assert.match(html, /Weddings/);
  assert.match(html, /Music/);
  assert.match(html, /\/entry\/aharon-image-6\.webp/);
  assert.match(html, /\/entry\/aharon-image-6\.jpg/);
  assert.match(html, /\/entry\/aharon-image-5\.webp/);
  assert.match(html, /\/entry\/aharon-image-5\.jpg/);
  assert.match(html, /\/brand\/ab-monogram\.svg/);
  assert.match(html, /href="\/weddings"/);
  assert.match(html, /href="\/music"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);

  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.match(
    css,
    /\.entry-landing\s*\{[^}]*color:\s*#fff\s*;/s,
    "entry choices must remain visible against the black popup background",
  );
});

test("preserves the existing landing experience at /weddings", async () => {
  const response = await render("/weddings");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Music rooted in.*meaning/i);
  assert.match(html, /Aharon Berk in collaboration with Azamra/);
  assert.match(html, /Through Azamra/);
  assert.match(html, /Chuppas:/);
  assert.match(html, /Horas and receptions:/);
  assert.match(html, /Explore the music/);
  assert.match(html, /Get in.*touch/);
  assert.match(
    html,
    /Aharon Berk is a Jewish singer, recording artist and live performer based in Johannesburg, and the founder and lead vocalist of Azamra\./,
  );
  assert.match(
    html,
    /Based in Johannesburg\. Available in Cape Town, across South Africa and internationally\./,
  );
  assert.match(html, /Find Aharon on/);
  assert.match(html, /href="#about"/);
  assert.match(html, /id="about"/);
  assert.match(html, /\/brand\/ab-monogram\.svg/);
  assert.match(html, /Aharon Berk is a Jewish singer/);
  assert.match(html, /Based in Johannesburg/);
  assert.match(html, /Available in Cape Town/);
  assert.match(html, /Watch Aharon/);
  assert.match(html, /Friedman &amp; Bach wedding/);
  assert.match(html, /Yeshiva College event/);
  assert.match(html, /\/performance\/friedman-bach\.webp/);
  assert.match(html, /\/performance\/maharsha\.webp/);
  assert.doesNotMatch(html, /From first note to final dance/);
  assert.doesNotMatch(html, /About Aharon|Wedding FAQs|Good to know/i);
  assert.match(html, /mailto:aharon@azamra\.co\.za/);
  assert.match(html, /api\.whatsapp\.com\/send\?phone=27722185278/);
  assert.match(html, /\/contact\/contact-black\.webp/);
  assert.match(html, /\/contact\/whatsapp-icon\.svg/);
  assert.match(html, /\/contact\/email\.svg/);
  assert.match(html, /aharon-berk-singing-1\.webp/);
  assert.match(html, /aharon-berk-singing-1\.jpg/);
  assert.doesNotMatch(html, /aharon-berk-singing-1\.png/);
  assert.match(html, /\/brand\/aharon\.svg/);
  assert.match(html, /\/brand\/berk\.svg/);
  assert.match(html, /instagram\.com\/aharonberk/);
  assert.match(html, /facebook\.com\/AharonBerk/);
  assert.match(html, /youtube\.com\/channel\/UCxAJ-494ZAh1azhFI_j0Krw/);
  assert.match(html, /open\.spotify\.com\/artist\/2on0c6iQBHGTIn30q7te5Q/);
  assert.match(html, /music\.apple\.com\/us\/artist\/aharon-berk\/1521973943/);
  assert.match(html, /\/social\/instagram\.svg/);
  assert.match(html, /\/weddings\/canopy-bg\.webp/);
  assert.match(html, /\/weddings\/canopy-bg\.png/);
  assert.doesNotMatch(html, /\/weddings\/chuppah-cutout\.(?:webp|png)/);
  assert.match(html, /\/music\/covers\/40-days\.webp/);
  assert.match(html, /\/music\/covers\/nafsheinu\.webp/);
  assert.match(html, /\/music\/covers\/piha-pascha\.webp/);
  assert.match(html, /\/music\/covers\/tefilas-hashla\.webp/);
  assert.match(html, /5ZH20UI0C8JdPthYiwUzcg/);
  assert.match(html, /0VEbu8A4mTR2e401opxbh7/);
  assert.match(html, /1U329vXa5l0MxMfAFIEPHp/);
  assert.match(html, /745D1UXIIBflDRkx227irz/);
  assert.match(html, /Music releases/);
  assert.match(html, /Nafsheinu/);
  assert.match(html, /40 Days/);
  assert.match(html, /Piha Pascha/);
  assert.match(html, /Tefilas Hashla/);
  assert.doesNotMatch(html, /Latest release title|Featured release · Placeholder/i);
});

test("provides a destination for the future music page", async () => {
  const response = await render("/music");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Music page coming soon/i);
  assert.match(html, /Return to the entrance/i);
});
