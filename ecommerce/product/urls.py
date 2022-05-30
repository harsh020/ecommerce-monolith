from django.urls import path

from ecommerce.product.views import ProductDetailView, ProductCreateView, ProductListView, ProductImageView, \
    ProductListTopView

urlpatterns = [
    path('create/', view=ProductCreateView.as_view(), name='product_create'),
    path('delete/<int:id>/', view=ProductCreateView.as_view(), name='product_delete'),
    path('image/upload/<int:id>/', view=ProductImageView.as_view(), name='product_image_upload'),
    path('update/<int:id>/', view=ProductCreateView.as_view(), name='product_update'),
    path('list/', view=ProductListView.as_view(), name='product_list'),
    path('list/top/', view=ProductListTopView.as_view(), name='product_list_top'),
    path('<int:id>/', view=ProductDetailView.as_view(), name='product_detail'),
]
