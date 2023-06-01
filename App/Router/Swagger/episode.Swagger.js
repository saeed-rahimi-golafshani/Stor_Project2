/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Add_Episode:
 *              type: object
 *              required: 
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseId: 
 *                      type: string
 *                      description: the course Id
 *                      example: 6403548e530901e984e7de91
 *                  chapterId:
 *                      type: string
 *                      description: the chapter Id
 *                      example: 6403548e530901e984e7de91
 *                  title: 
 *                      type: string
 *                      description: the title of episode
 *                      example: session 1
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: the best session
 *                  video: 
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock / lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock    
 *          Edit_Episode:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of episode
 *                      example: session 1
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: the best session
 *                  video: 
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock / lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock           
 */

/**
 * @swagger 
 *  /admin/episode/add:
 *      post: 
 *          tags: [Admin_panel(Episode)]
 *          summary: add Episode of Chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_Episode'
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
 *  /admin/episode/remove/{episodeId}:
 *      delete: 
 *          tags: [Admin_panel(Episode)]
 *          summary: delete Episode of Chapter
 *          parameters: 
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  required: true
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
 *  /admin/episode/update/{episodeId}:
 *      patch: 
 *          tags: [Admin_panel(Episode)]
 *          summary: edit Episode of Chapter
 *          parameters: 
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit_Episode'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */



