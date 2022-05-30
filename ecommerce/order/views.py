from rest_framework import permissions, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from ecommerce.order.models import Order
from ecommerce.order.serializers import OrderSerializer, OrderCreateSerializer


class OrderCreateView(GenericAPIView):
    serializer_class = OrderCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()

        validated_data = serializer.validated_data
        order = serializer.create(validated_data=validated_data)
        # print(OrderSerializer(order).data)
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id=None):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class()
        instance = serializer.get_by_id(id)

        return Response(serializer_class(instance).data, status=status.HTTP_200_OK)

    def patch(self, request, id=None):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid()

        validated_data = serializer.validated_data
        instance = Order.objects.get(id=id)
        instance = serializer.update(instance, validated_data)

        return Response(serializer_class(instance).data, status=status.HTTP_200_OK)


class OrderListView(GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()

    def get(self, request):
        serializer_class = self.get_serializer_class()
        instances = self.get_queryset().filter(user__id=request.user.id)

        return Response(serializer_class(instances, many=True, read_only=True).data, status=status.HTTP_200_OK)


class OrderAdminView(GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Order.objects.all()

    def get(self, request):
        serializer_class = self.get_serializer_class()
        instances = self.get_queryset()

        return Response(serializer_class(instances, many=True).data, status=status.HTTP_200_OK)

    def patch(self, request, id=None):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid()

        validated_data = serializer.validated_data
        instance = Order.objects.get(id=id)
        serializer.update(instance, validated_data)

        return Response(serializer_class(instance).data, status=status.HTTP_200_OK)