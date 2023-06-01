/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Blog:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   image
 *                  -   category
 *                  -   tags
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
 *                      type: string
 *                      description: the tags of blog
 *                  image: 
 *                      type: file
 *                      description: the picture of blog
 */

/**
 * @swagger 
 *  /admin/blogs:
 *      get:
 *          tags: [Admin_Panel(Blog)]
 *          summary: get all blogs 
 *          responses: 
 *                  200:
 *                     description: success -get array of blogs
 */

/**
 * @swagger 
 *  /admin/blogs/add:
 *      post:
 *          tags: [Admin_Panel(Blog)]
 *          summary: create blog document 
 *          consumer: 
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Blog'
 *          responses: 
 *                  201:
 *                     description: created
 */

/**
 * @swagger 
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Admin_Panel(Blog)]
 *          summary: update blog document 
 *          consumer: 
 *              -   multipart/form_data
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: text
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: short_text
 *              -   in: formData
 *                  type: string
 *                  example: tag1#tag2#tag3_foobar || undefined || str 
 *                  name: tags
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: category
 *              -   in: formData
 *                  type: file
 *                  required: false
 *                  name: image
 *          responses: 
 *                  200:
 *                     description: success
 */

/**
 * @swagger 
 *  /admin/blogs/{id}:
 *              get: 
 *                  tags: [Admin_Panel(Blog)]
 *                  summary: get blog with id and populate this field
 *                  parameters: 
 *                      -   in: path
 *                          name: id
 *                          type: string
 *                          required: true
 *                  responses: 
 *                      200: 
 *                          description: success
 */

/**
 * @swagger 
 *  /admin/blogs/delete/{id}:
 *              delete: 
 *                  tags: [Admin_Panel(Blog)]
 *                  summary: delete blog with id
 *                  parameters: 
 *                      -   in: path
 *                          name: id
 *                          type: string
 *                          required: true
 *                  responses: 
 *                      200: 
 *                          description: success
 */