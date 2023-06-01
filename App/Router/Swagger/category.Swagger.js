/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Category:
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of category
 *                  parent: 
 *                      type: string
 *                      description: the parent of category
 */

/**
 * @swagger 
 *  /admin/category/add:
 *      post:
 *          tags: [Admin_Panel(Category)]
 *          summary: create new category title
 *          parameters:   
 *              -   in: header
 *                  example: Bearer Token ...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExMjI4NTUzMCIsImlhdCI6MTY3NTM0OTE4NSwiZXhwIjoxNzA2OTA2Nzg1fQ.nZNMlAjolVbYj5YdGG8nvE5yBcGurZv6m5keKl6Z5iA
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Category'
 *          responses: 
 *                  201: 
 *                      description: success
 *                          
 */

/**
 * @swagger 
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin_Panel(Category)]
 *          summary: get all parents of category or categoryHeads
 *          responses: 
 *                    200: 
 *                       description: success
 */

/**
 * @swagger 
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin_Panel(Category))]
 *          summary: get child of parents
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true                 
 *          responses: 
 *                    200: 
 *                       description: success
 */

/**
* @swagger 
 *  /admin/category/all:
 *      get:
 *          tags: [Admin_Panel(Category)]
 *          summary: get All Categories             
 *          responses: 
 *                    200: 
 *                       description: success
 */

/**
* @swagger 
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Admin_Panel(Category)]
 *          summary: get All Categories withOut Populate           
 *          responses: 
 *                    200: 
 *                       description: success
 */

/**
 * @swagger 
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Admin_Panel(Category)]
 *          summary: update category for title
 *          parameters:
 *            -     in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Category'
 *          responses: 
 *                  200: 
 *                      description: success
 *                  500: 
 *                      description: internalServerError
 *                          
 */
/**
 * @swagger 
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin_Panel(Category)]
 *          summary: Delete Category with ObjectId
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id                    
 *          responses: 
 *                    200: 
 *                       description: success
 */

/**
 * @swagger 
 *  /admin/category/{id}:
 *      get:
 *          tags: [Admin_Panel(Category)]
 *          summary: get All Category with objectId
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id                    
 *          responses: 
 *                    200: 
 *                       description: success
 */