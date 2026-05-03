<div align="center">

<!-- Animated Header -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:1a3a6b,100:3b9eff&height=200&section=header&text=NLP%20Query%20Engine&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Ask%20your%20database%20and%20documents%20anything%20—%20in%20plain%20English&descAlignY=58&descSize=16&animation=fadeIn"/>

<br/>

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Gemma2--9b--it-F55036?style=for-the-badge&logo=groq&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=for-the-badge&logo=python&logoColor=white)
![FAISS](https://img.shields.io/badge/FAISS-Vector%20Store-00c7b7?style=for-the-badge&logo=meta&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22d3a0?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)

<br/>

> **An AI-powered Natural Language Query Engine** that lets you talk to your SQL databases  
> and unstructured documents (PDF, DOCX, TXT, CSV) using plain English — no SQL required.  
> For unstructured data, a full **RAG (Retrieval-Augmented Generation)** pipeline is employed  
> to deliver accurate, grounded, and source-attributed answers.

<br/>

[🚀 Features](#-features) • [🧠 RAG Pipeline](#-rag-pipeline-for-unstructured-data) • [🎨 Frontend](#-frontend-highlights) • [🛠️ Tech Stack](#%EF%B8%8F-tech-stack) • [🗂️ Structure](#%EF%B8%8F-project-structure) • [⚙️ Setup](#%EF%B8%8F-setup) • [🧪 Examples](#-example-queries) • [👨‍💻 Author](#-author)

</div>

---

## 🧩 Features

<table>
<tr>
<td width="50%">

### 🗄️ Database Connection
- Connect via any SQL connection string (MySQL, SQLite, PostgreSQL)
- Auto-discovers tables, columns & foreign key relationships
- Displays sample data from each table
- Live schema visualization in the UI

</td>
<td width="50%">

### 📄 Document Upload
- Supports **PDF, DOCX, TXT, CSV**
- Drag-and-drop with real-time upload progress
- Secure server-side storage & parsing
- Multi-file batch support

</td>
</tr>
<tr>
<td width="50%">

### 🧠 RAG for Unstructured Data
- Full **Retrieval-Augmented Generation** pipeline
- Chunk → Embed → Retrieve → Generate
- FAISS vector index for semantic similarity search
- Grounded answers with document source attribution

</td>
<td width="50%">

### ⚡ Intelligent Query Routing
- LLM auto-detects intent (SQL vs RAG)
- No manual switching needed
- Hybrid queries spanning DB + documents
- Built-in error handling & fallback logic

</td>
</tr>
<tr>
<td width="50%">

### 📊 Dynamic Results Display
- Tabular output for structured DB results
- Card view for document RAG answers
- Shows cache hit/miss & response time
- Result pagination for large datasets

</td>
<td width="50%">

### 🚀 Performance Optimizations
- Query caching via **Flask-Caching**
- SQLAlchemy connection pooling
- Async operations for concurrency
- Paginated & indexed results

</td>
</tr>
</table>

---

## 🧠 RAG Pipeline for Unstructured Data

For uploaded documents, the engine runs a full **Retrieval-Augmented Generation (RAG)** pipeline — not naive full-document prompting. This ensures accurate, grounded answers even on large files by only passing the most relevant context to the LLM.

```
📥 Ingest  ──►  ✂️ Chunk  ──►  🔢 Embed  ──►  🔍 Retrieve  ──►  🧠 Generate
```

| Stage | Description |
|-------|-------------|
| **📥 Ingest** | File is uploaded and parsed using PyPDF2 (PDF), python-docx (DOCX), or standard Python IO (TXT/CSV) |
| **✂️ Chunk** | Document is split into overlapping text passages to preserve context at boundaries |
| **🔢 Embed** | Each chunk is converted to a dense vector using a sentence-embedding model and stored in FAISS |
| **🔍 Retrieve** | User query is embedded → top-k semantically similar chunks are fetched from the FAISS index |
| **🧠 Generate** | Retrieved context is injected into a Groq (Gemma2-9b-it) prompt → grounded, cited answer is returned |

> 💡 **SQL Engine (Structured Data):** LLM reads the auto-discovered schema → generates valid SQL → SQLAlchemy executes it → results returned as a formatted, paginated table.

---

## 🎨 Frontend Highlights

| UI Feature | Description |
|------------|-------------|
| 🌌 **Animated Gradient Background** | Dynamic blue gradient with soft animated transitions |
| 💎 **Glassmorphic Panels** | Bulging 3D cards with glowing hover effects |
| 🧭 **Navbar** | Title "NLP Query Engine" with theme toggle and cache clear |
| 📂 **Animated Drop Zone** | Drag-and-drop file upload with glowing ring animation |
| 🧾 **Schema Visualization** | Live table cards showing DB sample data |
| ⚡ **Real-Time Feedback** | Loading states, upload progress bars & error guidance |
| 🌓 **Dark / Light Mode** | Dynamic theme toggle for better UX |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML, CSS (Glassmorphism + Animation), JavaScript (Axios) |
| **Backend** | Flask (Python) |
| **LLM / AI** | Groq API — `gemma2-9b-it` |
| **RAG** | FAISS vector store + Sentence Embeddings |
| **Database** | MySQL / SQLite / PostgreSQL via SQLAlchemy |
| **Document Parsing** | PyPDF2, python-docx |
| **Caching** | Flask-Caching |
| **Schema Discovery** | Custom SQLAlchemy introspection service |

---

## 🗂️ Project Structure

```
NLP_Query_Engine/
├── app.py                    # Flask app entry point
├── routes/
│   └── ingest.py             # DB & document ingestion routes
├── services/
│   ├── schema_discover.py    # Table / column / FK extraction
│   ├── rag_pipeline.py       # Chunking, embedding & retrieval (RAG)
│   └── query_router.py       # SQL vs RAG decision logic
├── templates/
│   └── index.html            # Main frontend UI
├── static/
│   ├── css/
│   │   └── style.css         # UI styles and animations
│   ├── js/
│   │   └── main.js           # Frontend interactivity
│   └── img/
│       └── logo.png          # App logo
├── uploads/                  # User-uploaded documents
├── requirements.txt          # Project dependencies
└── README.md                 # Project documentation
```

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/CoderJaynt/nlp-query-engine.git
cd nlp-query-engine
```

### 2. Create & activate a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure your database

```python
# MySQL
DB_URL = "mysql+pymysql://root:password@localhost/employee_db"

# SQLite
DB_URL = "sqlite:///employee.db"

# PostgreSQL
DB_URL = "postgresql://user:password@localhost/mydb"
```

### 5. Add your Groq API Key

```python
# In app.py (or use a .env file with python-dotenv)
from groq import Groq

groq_client = Groq(api_key="your_groq_api_key_here")
```

> 💡 Tip: Store your key in a `.env` file and load it with `python-dotenv` to keep secrets out of source code.

### 6. Run the application

```bash
python app.py
# → Running on http://127.0.0.1:5000
```

---

## 🧪 Example Queries

| Type | Example |
|------|---------|
| 🗄️ **Database SQL** | `"Show all employees in the HR department"` |
| 🧠 **RAG Document** | `"Summarize the key findings in the uploaded annual report"` |
| 🔍 **RAG Filter** | `"What does the uploaded policy document say about remote work?"` |
| 🔀 **Hybrid** | `"Find salary details of employees mentioned in the uploaded document"` |
| 📊 **Aggregation** | `"What is the average salary per department?"` |
| 📄 **Multi-doc** | `"Compare the Q1 and Q2 reports uploaded — what changed?"` |

---

## 🖼️ UI Preview

> *(Add screenshots here after running the app)*

```
[ Screenshot: Home / Query Interface ]
[ Screenshot: Schema Visualization Panel ]
[ Screenshot: Document Upload & RAG Answer ]
[ Screenshot: SQL Result Table ]
```

---

## 📦 requirements.txt (Key Dependencies)

```
flask
flask-caching
groq
sqlalchemy
pymysql
pypdf2
python-docx
faiss-cpu
sentence-transformers
python-dotenv
axios
```

---

## 🗺️ Roadmap

- [x] Natural language to SQL query generation
- [x] RAG pipeline for PDF / DOCX / TXT / CSV
- [x] FAISS vector index & semantic retrieval
- [x] Intelligent SQL vs RAG routing
- [x] Query caching & connection pooling
- [ ] Multi-turn conversational memory
- [ ] Authentication & user sessions
- [ ] Cloud deployment (AWS / GCP / Railway)
- [ ] Support for Excel (.xlsx) documents
- [ ] REST API with Swagger docs

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# → Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/CoderJaynt" width="100" style="border-radius:50%"/>

### Jayant Yadav

🎓 B.Tech (Data Science) — Galgotias University  
💼 Data Scientist | AI & ML Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jayant-yadav-a22b98283)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CoderJaynt)

</div>

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:3b9eff,50:1a3a6b,100:0d1117&height=120&section=footer"/>

**⭐ If you found this useful, consider giving the repo a star!**

</div>
