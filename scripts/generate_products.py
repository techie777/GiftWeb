# Script to generate products 29 to 230
import json

FLOWER_IMAGES = [
    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&auto=format&fit=crop'
]

CAKE_IMAGES = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=600&auto=format&fit=crop'
]

PERSONALIZED_IMAGES = [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop'
]

HAMPER_IMAGES = [
    'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567591414240-e22262d94b0d?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop'
]

print('Script written')
