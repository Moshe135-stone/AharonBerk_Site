import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the Aharon Berk foundation site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Aharon Berk \| Jewish Singer, Recording Artist &amp; Wedding Music<\/title>/i,
  );
  assert.match(html, /Jewish music/);
  assert.match(html, /Music rooted in meaning/);
  assert.match(html, /Music for the/);
  assert.match(html, /Planning a wedding/);
  assert.match(html, /aharon-berk-singing-1\.png/);
  assert.match(html, /\/brand\/aharon\.svg/);
  assert.match(html, /\/brand\/berk\.svg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
