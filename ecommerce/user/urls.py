from django.urls import path

from ecommerce.user.views import UserDetailView, UserAuthView, UserListView, UserCreateView, UserAdminView

urlpatterns = [
    path('register/', view=UserCreateView.as_view(), name='user_auth'),
    path('login/', view=UserAuthView.as_view(), name='user_auth'),
    path('profile/', view=UserDetailView.as_view(), name='user_detail'),
    path('list/', view=UserListView.as_view(), name='user_list'),
    path('<int:id>/', view=UserAdminView.as_view(), name='user_admin_detail'),
    path('delete/<int:id>/', view=UserAdminView.as_view(), name='user_admin_delete'),
    path('update/<int:id>/', view=UserAdminView.as_view(), name='user_admin_update'),
]

