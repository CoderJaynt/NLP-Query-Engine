from sqlalchemy import create_engine, inspect

class SchemaDiscovery:
    def analyze_database(self, connection_string: str) -> dict:
        try:
            engine = create_engine(connection_string)
            inspector = inspect(engine)

            tables = []
            for table_name in inspector.get_table_names():
                columns = [
                    {"name": col["name"], "type": str(col["type"])}
                    for col in inspector.get_columns(table_name)
                ]
                fks = inspector.get_foreign_keys(table_name)
                foreign_keys = [
                    {
                        "column": fk["constrained_columns"],
                        "ref_table": fk["referred_table"],
                        "ref_column": fk["referred_columns"],
                    }
                    for fk in fks if fk.get("referred_table")
                ]

                tables.append({
                    "name": table_name,
                    "columns": columns,
                    "foreign_keys": foreign_keys
                })

            return {"tables": tables}

        except Exception as e:
            return {"error": str(e)}
