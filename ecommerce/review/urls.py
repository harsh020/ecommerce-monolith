from django.urls import path

from ecommerce.review.views import ReviewCreateView, ReviewListView

urlpatterns = [
    path('create/', view=ReviewCreateView.as_view(), name='review_create'),
    path('list/', view=ReviewListView.as_view(), name='review_list'),
]
