import assert from "node:assert/strict";
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
  assert.match(html, /\/entry\/wedding-canopy\.png/);
  assert.match(html, /\/entry\/stacked-vinyl\.png/);
  assert.match(html, /\/brand\/ab-monogram\.svg/);
  assert.match(html, /href="\/weddings"/);
  assert.match(html, /href="\/music"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("preserves the existing landing experience at /weddings", async () => {
  const response = await render("/weddings");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Music rooted in meaning/);
  assert.match(html, /Music for the/);
  assert.match(html, /Planning a wedding/);
  assert.match(html, /aharon-berk-singing-1\.webp/);
  assert.match(html, /aharon-berk-singing-1\.jpg/);
  assert.doesNotMatch(html, /aharon-berk-singing-1\.png/);
  assert.match(html, /\/brand\/aharon\.svg/);
  assert.match(html, /\/brand\/berk\.svg/);
});

test("provides a destination for the future music page", async () => {
  const response = await render("/music");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Music page coming soon/i);
  assert.match(html, /Return to the entrance/i);
});
