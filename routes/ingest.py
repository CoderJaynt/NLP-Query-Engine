from flask import Blueprint, request, jsonify
from services.schema_discovery import SchemaDiscovery

ingest_bp = Blueprint('ingest', __name__)

@ingest_bp.route('/ingest/database', methods=['POST'])
def ingest_database():
    data = request.get_json()
    conn_str = data.get("connection_string")
    if not conn_str:
        return jsonify({"error": "Connection string is required"}), 400

    discovery = SchemaDiscovery()
    schema_info = discovery.analyze_database(conn_str)
    return jsonify(schema_info), 200
