## Models

- User
- Payment
- Product
- ProductItem
- Order
- ShippingAddress
- Review

## Relationship

- User (1 has n) ShippingAddress
- User (1 has n) Order
- User (1 has n) Review
- Product (1 have n) ProductItem
- Product (1 has n) Review
- Product (n have m) User (Seller)
- Order (1 has n) ProductItem
- Order (1 has 1) ShippingAddress
- Order (1 have n) Payment

## Attributes

- User
    - username
    - first_name
    - last_name
    - email
    - password
    - is_active
    - is_staff
    - is_superuser
    
- Product
    - name
    - slug
    - description
    - price
    - stock
    - category
    - brand
    - image
    - seller : User
    
- ProductItem
    - order : OrderItem
    - product : Product
    - name
    - quantity
    - price
    - image
    
- Order
    - shipping_address : ShippingAddress
    - user : User
    - tax_amount
    - shipping_amount
    - total_amount
    - payment_method
    - payment_status
    - status
    - delivered_at
    - created_at

- ShippingAddress
    - user
    - address
    - city
    - state
    - country
    - pincode
    - shipping_price

- Review
    - user : User
    - product : Product
    - rating
    - comment
    - created_at
    
- Payment
    - order : Order
    - payment_method
    - payment_status : Enum
    - amount
    