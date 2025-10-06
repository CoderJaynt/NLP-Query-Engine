const connInput = document.getElementById("conn-string");
const testConnBtn = document.getElementById("test-conn");
const schemaOutput = document.getElementById("schema-output");
const runDBBtn = document.getElementById("run-db");
const runDocBtn = document.getElementById("run-doc");
const queryInput = document.getElementById("query-input");
const resultsDiv = document.getElementById("results");
const metricsDiv = document.getElementById("metrics");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const uploadProgress = document.getElementById("upload-progress");
const clearCacheBtn = document.getElementById("clear-cache");

// Animate file upload box
dropZone.addEventListener("click", () => fileInput.click());
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.classList.add("hover");
});
dropZone.addEventListener("dragleave", () => dropZone.classList.remove("hover"));
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("hover");
  uploadFiles(e.dataTransfer.files);
});
fileInput.addEventListener("change", () => uploadFiles(fileInput.files));

async function uploadFiles(files) {
  const formData = new FormData();
  for (let file of files) formData.append("files", file);

  uploadProgress.innerText = "Uploading...";
  const res = await axios.post("/api/ingest/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  uploadProgress.innerText = res.data.message;
}

testConnBtn.addEventListener("click", async () => {
  const conn = connInput.value.trim();
  if (!conn) return alert("Please enter a connection string.");

  schemaOutput.innerHTML = "<p>⏳ Connecting...</p>";

  try {
    const res = await axios.post("/api/ingest/database", { connection_string: conn });
    const tables = res.data.tables || [];

    if (!tables.length) {
      schemaOutput.innerHTML = "<p>No tables found.</p>";
      return;
    }

    let html = "";
    tables.forEach(t => {
      html += `
        <div class="table-card">
          <h3>📦 ${t.name}</h3>
          <ul>
            ${t.columns.map(c => `<li><b>${c.name}</b> → <span>${c.type}</span></li>`).join("")}
          </ul>
          ${t.foreign_keys.length ? `
            <div class="foreign">
              <h4>🔗 Foreign Keys</h4>
              ${t.foreign_keys.map(fk => `
                <p>${fk.column.join(", ")} → ${fk.ref_table}.${fk.ref_column.join(", ")}</p>
              `).join("")}
            </div>` : ""}
        </div>
      `;
    });
    schemaOutput.innerHTML = html;
  } catch (err) {
    schemaOutput.innerHTML = `<p style="color:red;">❌ ${err.response?.data?.error || err.message}</p>`;
  }
});


runDBBtn.addEventListener("click", async () => {
  const res = await axios.post("/api/query", {
    connection_string: connInput.value,
    query: queryInput.value
  });
  renderResults(res.data);
});

runDocBtn.addEventListener("click", async () => {
  const res = await axios.post("/api/query", { query: queryInput.value });
  renderResults(res.data);
});

clearCacheBtn.addEventListener("click", () => {
  axios.get("/clear-cache").then(() => alert("Cache Cleared"));
});

function renderResults(data) {
  resultsDiv.innerHTML = "";
  if (data.mode === "database" && data.results.length) {
    const table = document.createElement("table");
    const headers = Object.keys(data.results[0]);
    table.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>` +
      data.results.map(r => `<tr>${headers.map(h => `<td>${r[h]}</td>`).join("")}</tr>`).join("");
    resultsDiv.appendChild(table);
  } else if (data.mode === "document") {
    data.results.forEach(r => {
      const card = document.createElement("div");
      card.className = "doc-card";
      card.innerHTML = `<h4>${r.filename}</h4><p>${r.summary || r.snippet || "No content found."}</p>`;
      resultsDiv.appendChild(card);
    });
  }
  metricsDiv.innerText = `Cache Hit: ${data.cache_hit || false}`;
}
