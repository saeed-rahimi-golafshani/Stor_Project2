/**
 * @swagger
 *  components: 
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */
/**
 * @swagger
 *  components: 
 *      schemas:
 *          Status:
 *              type: string
 *              enum:
 *                  -   NotStarted
 *                  -   Completed
 *                  -   Holding
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      courses:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text: 
 *                                      type: string
 *                                      example: "text of course"
 *                                  statuse: 
 *                                      type: string
 *                                      example: "'notStarted'| 'Completed' | 'Holding'"
 *                                  time: 
 *                                      type: string
 *                                      example: "01:23:14"
 *                                  price: 
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: integer
 *                                      example: 20 "%"
 *                                  studentcount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher: 
 *                                      type: string
 *                                      example: "saeed rahimi"                  
 */

/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Course:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *                  -   status
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of course
 *                      example: متن کوتاه
 *                  text: 
 *                      type: string
 *                      description: the text of course
 *                      example: توضیحات کامل
 *                  category: 
 *                      type: string
 *                      description: the category for fprienkey of course
 *                  tags: 
 *                      type: array
 *                      description: the tags of course
 *                  price:       
 *                      type: string
 *                      description: the price of course
 *                  discount:      
 *                      type: string
 *                      description: the discount of course
 *                  image: 
 *                      type: string
 *                      format: binary
 *                  type:      
 *                      $ref: '#/components/schemas/Types'
 *                  status:
 *                      $ref: '#/components/schemas/Status'
 *          Edit_Course:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of course
 *                      example: متن کوتاه
 *                  text: 
 *                      type: string
 *                      description: the text of course
 *                      example: توضیحات کامل
 *                  category: 
 *                      type: string
 *                      description: the category for fprienkey of course
 *                  tags: 
 *                      type: array
 *                      description: the tags of course
 *                  price:       
 *                      type: string
 *                      description: the price of course
 *                  discount:      
 *                      type: string
 *                      description: the discount of course
 *                  image: 
 *                      type: string
 *                      format: binary
 *                  type:      
 *                      $ref: '#/components/schemas/Types'
 *                  status:
 *                      $ref: '#/components/schemas/Status'
*/

/**
 * @swagger 
 *  /admin/course/add:
 *      post:
 *          tags: [Admin_panel(Course)]
 *          summary: create and save course 
 *          consumer: 
 *              -   multipart/form-data       
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Course'
 *          responses: 
 *                  201:
 *                      description: created
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 *                      
 */

/**
 * @swagger 
 *  /admin/course/list:
 *      get:
 *          tags: [Admin_panel(Course)]
 *          summary: get list of course without courseId
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search of course with title, short_text, text 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger 
 *  /admin/course/list/{id}:
 *      get:
 *          tags: [Admin_panel(Course)]
 *          summary: get list of course with courseId
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: find course with id 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger 
 *  /admin/course/update/{id}:
 *      patch:
 *          tags: [Admin_panel(Course)]
 *          summary: update of course with courseId
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: find course with id 
 *          consumer: 
 *              -   multipart/form-data       
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Edit_Course'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

