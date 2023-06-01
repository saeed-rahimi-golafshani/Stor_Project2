/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Edit_product:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of blog
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of blog
 *                  text: 
 *                      type: string
 *                      description: the text of blog
 *                  category: 
 *                      type: string
 *                      description: the category for fprienkey of blog
 *                  tags: 
 *                      type: array
 *                      description: the tags of blog
 *                  price:      
 *                      type: string
 *                      description: the price of product
 *                  discount:      
 *                      type: string
 *                      description: the discount of product
 *                  count:      
 *                      type: string
 *                      description: the count of product
 *                  height:      
 *                      type: string
 *                      description: the height of product for packet
 *                  weight:      
 *                      type: string
 *                      description: the weight of product for packet
 *                  width:      
 *                      type: string
 *                      description: the width of product for packet
 *                  length:      
 *                      type: string
 *                      description: the length of product for packet
 *                  images: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  type:      
 *                      type: string
 *                      value: virtual|physical
 *                      example: virtual/physical
 *                      description: the type of product                      
*/
/**
 * @swagger 
 *  components:
 *      schemas: 
 *          product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of blog
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of blog
 *                  text: 
 *                      type: string
 *                      description: the text of blog
 *                  category: 
 *                      type: string
 *                      description: the category for fprienkey of blog
 *                  tags: 
 *                      type: array
 *                      description: the tags of blog
 *                  price:      
 *                      type: string
 *                      description: the price of product
 *                  discount:      
 *                      type: string
 *                      description: the discount of product
 *                  count:      
 *                      type: string
 *                      description: the count of product
 *                  height:      
 *                      type: string
 *                      description: the height of product for packet
 *                  weight:      
 *                      type: string
 *                      description: the weight of product for packet
 *                  width:      
 *                      type: string
 *                      description: the width of product for packet
 *                  length:      
 *                      type: string
 *                      description: the length of product for packet
 *                  images: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  type:      
 *                      type: string
 *                      value: virtual/physical
 *                      example: virtual/physical
 *                      description: the type of product and default physical                      
*/

/**
 * @swagger 
 *  /admin/product/add:
 *      post:
 *          tags: [Admin_panel(Product)]
 *          summary: create and save product 
 *          consumer: 
 *              -   multipart/form-data       
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/product'
 *          responses: 
 *                  201:
 *                     description: created
 */

/**
 * @swagger 
 *  /admin/product/list:
 *      get:
 *          tags: [Admin_panel(Product)]
 *          summary: Get All Product
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, short_tex , text of (product)
 *          responses: 
 *                  200:
 *                     description: success
 */

/**
 * @swagger 
 *  /admin/product/{id}:
 *      get:
 *          tags: [Admin_panel(Product)]
 *          summary: Get one Product By ID
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses: 
 *                  200:
 *                     description: success
 */

/**
 * @swagger 
 *  /admin/product/delete/{id}:
 *      delete:
 *          tags: [Admin_panel(Product)]
 *          summary: Delete one Product By ID
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses: 
 *                  200:
 *                     description: success
 */

/**
 * @swagger 
 *  /admin/product/edit/{id}:
 *      patch:
 *          tags: [Admin_panel(Product)]
 *          summary: edit product by id 
 *          consumer: 
 *              -   multipart/form-data 
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true      
 *          requestBody: 
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Edit_product'
 *          responses: 
 *                  200:
 *                     description: access
 */