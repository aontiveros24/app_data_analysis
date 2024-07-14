from rest_framework import generics
from .models import Vulnerability

# from .serializers import VulnerabilitySerializer
from rest_framework.parsers import FileUploadParser
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response

import csv
import io

import rapidminer
import os
import joblib

model_path = os.path.join(os.path.dirname(__file__), "decission_tree_model.pkl")
model = joblib.load(model_path)

rm_home = "C:/Program Files/RapidMiner/RapidMiner Studio"
connector = rapidminer.Studio(rm_home, rm_stdout=open(os.devnull, "w"))
score_path = "//Local Repository/project_data_analysis/process/Decision Tree/score"


class SeverityCountView(APIView):
    def get(self, request):
        severity_counts = (
            Vulnerability.objects.values("severity")
            .annotate(count=Count("severity"))
            .order_by("severity")
        )
        return Response(severity_counts)


class SeverityVsCVSSChart(APIView):
    def get(self, request):
        data = [
            {"severity": item.severity, "cvss": item.cvss}
            for item in Vulnerability.objects.all()
        ]
        return Response(data)


class PredictionView(APIView):
    def post(self, request):
        vendor_project = request.data.get("vendor_project")
        product = request.data.get("product")
        vulnerability_name = request.data.get("vulnerability_name")
        grp = request.data.get("grp")
        cvss = request.data.get("cvss")
        cwe = request.data.get("cwe")
        vector = request.data.get("vector")
        date_added_year = request.data.get("date_added_year")
        date_added_month = request.data.get("date_added_month")
        date_added_day = request.data.get("date_added_day")
        due_date_year = request.data.get("due_date_year")
        due_date_month = request.data.get("due_date_month")
        due_date_day = request.data.get("due_date_day")
        pub_date_year = request.data.get("pub_date_year")
        pub_date_month = request.data.get("pub_date_month")
        pub_date_day = request.data.get("pub_date_day")

        value_to_predict = [
            vendor_project,
            product,
            vulnerability_name,
            grp,
            cvss,
            cwe,
            vector,
            date_added_year,
            date_added_month,
            date_added_day,
            due_date_year,
            due_date_month,
            due_date_day,
            pub_date_year,
            pub_date_month,
            pub_date_day,
        ]

        execution_type = request.data.get("execution_type")
        if execution_type == "python":
            prediction = model.predict([value_to_predict])
        else:
            prediction = connector.run_process(
                score_path,
                inputs=[value_to_predict],
            )
            prediction = prediction["prediction(severity)"]
        return Response({"prediction": prediction[0]})


class UploadCSVAPIView(APIView):
    # parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES["file"]
        if not file_obj.name.endswith(".csv"):
            return Response({"error": "File is not a CSV"}, status=400)

        try:
            rm_home = "C:/Program Files/RapidMiner/RapidMiner Studio"
            connector = rapidminer.Studio(rm_home, rm_stdout=open(os.devnull, "w"))
            score_path = (
                "//Local Repository/project_data_analysis/process/Decision Tree/score"
            )

            decoded_file = file_obj.read().decode("utf-8")
            data = io.StringIO(decoded_file)

            results = connector.run_process(
                score_path,
                inputs=data,
            )
            # C:/Users/andre/OneDrive/Desktop/rapidminer/data.csv

            # # Procesar el archivo CSV
            # csv_data = []
            # # decoded_file = file_obj.read().decode("utf-8").splitlines()
            # # reader = csv.DictReader(decoded_file)

            # for row in reader:
            #     # Aquí puedes procesar cada fila del CSV como desees
            #     csv_data.append(row)

            # Ejemplo de respuesta con los datos procesados
            return Response({"data": str(results["prediction(severity)"])})
        except Exception as e:
            return Response({"error": str(e)}, status=400)


# class VulnerabilityListCreateView(generics.ListCreateAPIView):
#     queryset = Vulnerability.objects.all().order_by("-date")
#     serializer_class = VulnerabilitySerializer
