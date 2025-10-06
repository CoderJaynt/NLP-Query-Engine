🧠 NLP Query Engine

An AI-powered Natural Language Query Engine built with Flask and Groq, capable of handling both structured (SQL) and unstructured (PDF, DOCX, TXT) data queries.
Users can connect to a database, upload documents, ask natural language questions, and get intelligent answers — all from a clean, responsive web interface.

🚀 Key Features
🧩 Core Capabilities

1. Database Connection:

Connect using any SQL connection string (MySQL, SQLite, PostgreSQL, etc.)

Auto-discovers tables, columns, and foreign key relationships

Displays sample data from each table

2. Document Upload:

Supports multiple file types: PDF, DOCX, TXT, CSV

Real-time upload progress & feedback

Secure file storage and parsing

3. Intelligent Query Engine:

Uses Groq’s LLM (Gemma2-9b-it) to interpret user queries

Dynamically determines whether to run an SQL query or analyze uploaded documents

Returns summarized or extracted document insights

4. Dynamic Results Display:

Tabular output for structured (DB) results

Card view for document answers

Shows cache hit/miss, response time, and attribution

5. Performance Optimizations:

Query caching (Flask-Caching)

Connection pooling

Async operations for concurrency

Result pagination


🎨 Frontend Highlights

| UI Feature                              | Description                                                |
| --------------------------------------- | ---------------------------------------------------------- |
| 🌌 **Dynamic Blue Gradient Background** | Animated gradient background with soft transitions         |
| 💎 **Glassmorphic Panels**              | Bulging 3D cards with glowing hover effects                |
| 🧭 **Navbar**                           | Title “NLP Query Engine” with theme toggle and cache clear |
| 📂 **Animated Document Drop Zone**      | Drag-and-drop file upload with glowing animation           |
| 🧾 **Schema Visualization**             | Clean table cards with live DB sample data                 |
| ⚡ **Real-Time Feedback**                | Loading states, upload progress, and error guidance        |
| 🌓 **Dark/Light Mode (optional)**       | Dynamic theme toggle for better UX                         |

🧰 Tech Stack

| Layer             | Technology                                               |
| ----------------- | -------------------------------------------------------- |
| **Frontend**      | HTML, CSS (glassmorphism, animation), JavaScript (Axios) |
| **Backend**       | Flask (Python)                                           |
| **Database**      | MySQL / SQLite (via SQLAlchemy)                          |
| **AI Model**      | Groq API (`gemma2-9b-it`)                                |
| **File Handling** | PyPDF2, python-docx                                      |
| **Caching**       | Flask-Caching                                            |
| **Visualization** | Dynamic schema and table rendering                       |

## 🏗️ Project Structure

NLP_Query_Engine/
├── app.py # Flask app entry point
├── routes/ # API route modules
│ └── ingest.py # Routes for database & document ingestion
├── services/ # Business logic and helpers
│ └── schema_discover.py # Extracts table, column, FK info from database
├── templates/
│ └── index.html # Main frontend UI
├── static/
│ ├── css/
│ │ └── style.css # UI styles and animations
│ ├── js/
│ │ └── main.js # Frontend interactivity (query, upload, etc.)
│ └── img/
│ └── logo.png # App icon/logo
├── uploads/ # User-uploaded documents
├── requirements.txt # Project dependencies
└── README.md # Project documentation

⚙️ Setup Instructions

1. Clone the Repository:
git clone https://github.com/yourusername/nlp-query-engine.git
cd nlp-query-engine

2. Create and Activate a Virtual Environment:
python -m venv venv

Windows: venv\Scripts\activate

macOS/Linux: source venv/bin/activate

3. Install Dependencies:
pip install -r requirements.txt

4. Configure Database

MySQL: mysql+pymysql://root:password@localhost/employee_db

SQLite: sqlite:///employee.db

5. Add Groq API Key:

In app.py (or environment variable):
groq_client = Groq(api_key="your_groq_api_key_here")

6. Run the Application:

python app.py

🧪 Example Queries
| Type         | Example                                                           |
| ------------ | ----------------------------------------------------------------- |
| **Database** | “Show all employees in HR department”                             |
| **Document** | “Summarize the uploaded annual report”                            |
| **Hybrid**   | “Find salary details of employees mentioned in uploaded document” |

👨‍💻 Author

Jayant Yadav
🎓 B.Tech (Data Science) — Galgotias University
💼 Data Scientist | AI & ML Developer

LinkedIn: https://www.linkedin.com/in/jayant-yadav-a22b98283

GitHub: https://github.com/CoderJaynt
