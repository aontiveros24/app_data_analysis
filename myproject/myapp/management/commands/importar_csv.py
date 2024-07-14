import csv
from django.core.management.base import BaseCommand
from myapp.models import (
    Vulnerability,
)  # Asegúrate de reemplazar `myapp` con el nombre de tu aplicación


class Command(BaseCommand):
    help = "Importa datos desde un archivo CSV a la base de datos"

    def add_arguments(self, parser):
        parser.add_argument(
            "csv_file",
            type=str,
            help="La ruta al archivo CSV a importar",
        )

        "./myapp/data_filtered.csv"

    def handle(self, *args, **kwargs):
        csv_file = kwargs["csv_file"]

        with open(csv_file, "r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                Vulnerability.objects.create(
                    vendor_project=row["vendor_project"],
                    product=row["product"],
                    vulnerability_name=row["vulnerability_name"],
                    date_added=row["date_added"],
                    short_description=row["short_description"],
                    required_action=row["required_action"],
                    due_date=row["due_date"],
                    grp=row["grp"],
                    pub_date=row["pub_date"],
                    cvss=row["cvss"],
                    cwe=row["cwe"],
                    vector=row["vector"],
                    complexity=row["complexity"],
                    severity=row["severity"],
                )

        self.stdout.write(self.style.SUCCESS("Datos importados con éxito"))
