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
  assert.match(html, /\/entry\/aharon-image-6\.webp/);
  assert.match(html, /\/entry\/aharon-image-6\.jpg/);
  assert.match(html, /\/entry\/aharon-image-5\.webp/);
  assert.match(html, /\/entry\/aharon-image-5\.jpg/);
  assert.match(html, /\/brand\/ab-monogram\.svg/);
  assert.match(html, /href="\/weddings"/);
  assert.match(html, /href="\/music"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("preserves the existing landing experience at /weddings", async () => {
  const response = await render("/weddings");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Music rooted in.*meaning/i);
  assert.match(html, /Music for the/);
  assert.match(html, /Planning a wedding/);
  assert.match(html, /Aharon Berk is a Jewish singer/);
  assert.match(html, /Based in Johannesburg/);
  assert.match(html, /Available in Cape Town/);
  assert.match(html, /aharon-berk-singing-1\.webp/);
  assert.match(html, /aharon-berk-singing-1\.jpg/);
  assert.doesNotMatch(html, /aharon-berk-singing-1\.png/);
  assert.match(html, /\/brand\/aharon\.svg/);
  assert.match(html, /\/brand\/berk\.svg/);
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
