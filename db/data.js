import { faker } from '@faker-js/faker';

export const products = []
export const categories = []

for (let i = 0; i < 50; i++) {
  products.push({
    category_id: Math.floor(Math.random() * 10) + 1,
    name: faker.commerce.productName(),
    description: faker.commerceproductDescription(),
    imgUrl: faker.image.urlLoremFlickr({ category: 'technics' }),
    stock: faker.number.int({ max: 100 }),
    price: faker.number.float({ max: 500 }),
    vendor: faker.company.name()
  })
}

for (let i = 0; i < 10; i++) {
  categories.push({
    product_id: Math.floor(Math.random() * 50) + 1,
    name: faker.commerce.product(),
    description: faker.commerceproductDescription()
  })
}