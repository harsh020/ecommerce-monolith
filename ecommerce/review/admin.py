from django.contrib import admin

from ecommerce.review.models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    model = Review
