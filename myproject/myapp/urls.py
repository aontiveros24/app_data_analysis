from django.urls import path
from .views import (
    SeverityCountView,
    SeverityVsCVSSChart,
    UploadCSVAPIView,
    PredictionView,
)

urlpatterns = [
    path("severity-count/", SeverityCountView.as_view(), name="severity-count"),
    path(
        "severity-vs-cvss-chart/",
        SeverityVsCVSSChart.as_view(),
        name="severity-vs-cvss-chart",
    ),
    path("prediction/", PredictionView.as_view(), name="prediction"),
    path("upload-csv/", UploadCSVAPIView.as_view(), name="upload-csv"),
]
