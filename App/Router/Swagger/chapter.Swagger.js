
/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Add_Chapter:
 *              type: object
 *              required: 
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 6403548e530901e984e7de91
 *                  title: 
 *                      type: string
 *                      example: session 1
 *                  text:
 *                      type: string
 *                      example: the best session
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: session 1
 *                  text:
 *                      type: string
 *                      example: the best session
 */

/**
 * @swagger
 *  definitions:
 *      ChapterOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties:
 *                      course: 
 *                          type: object
 *                          properties:
 *                              -id:
 *                                  type: string
 *                                  example: "6403548e530901e984e7de91"
 *                              title: 
 *                                  type: string
 *                                  example: "Node.Js"
 *                              chapter:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          title: 
 *                                              type: strin
 *                                              example: "session 1"
 *                                          text: 
 *                                              type: string
 *                                              example: "learning node js"
 *                                          episode: 
 *                                              type: array
 *                                              example: []
 *                                          _id: 
 *                                              type: string
 *                                              example: "6403548e530901e984e7de91"
 */

/**
 * @swagger 
 *  /admin/chapter/add:
 *      put: 
 *          tags: [Admin_panel(Chapter)]
 *          summary: add session of course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_Chapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_Chapter'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */


/**
 * @swagger 
 *  /admin/chapter/list/{courseID}:
 *      get: 
 *          tags: [Admin_panel(Chapter)]
 *          summary: get list session of course with courseID
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: courseID
 *                  required: true 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/ChapterOfCourseDefinition'                
 */

/**
 * @swagger 
 *  /admin/chapter/remove/{chapterId}:
 *      patch: 
 *          tags: [Admin_panel(Chapter)]
 *          summary: remove session of course with chapterId
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: chapterId
 *                  required: true 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */

/**
 * @swagger 
 *  /admin/chapter/update/{chapterId}:
 *      patch: 
 *          tags: [Admin_panel(Chapter)]
 *          summary: update session of course with chapterId
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: chapterId
 *                  required: true 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */