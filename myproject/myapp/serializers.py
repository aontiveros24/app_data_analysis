from rest_framework import serializers
from myapp.models import Vulnerability


# class VulnerabilitySerializer(serializers.ModelSerializer):
#     key = serializers.SerializerMethodField()
#     date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)

#     class Meta:
#         model = Vulnerability
#         fields = "__all__"

#     def get_key(self, obj):
#         return obj.id
