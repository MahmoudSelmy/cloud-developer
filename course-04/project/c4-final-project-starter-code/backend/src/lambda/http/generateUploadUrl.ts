import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk'

import { addAttachmentUrlToTodo } from '../../buisnessLogic/todo'

const XAWSS3 = AWSXRay.captureAWS(AWS)
const s3 = new XAWSS3.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.TODOS_S3_BUCKET;
const urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION);

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId


  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  const url = s3.getSignedUrl('putObject', 
  {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })

  const attachmenturl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

  const success = await addAttachmentUrlToTodo(todoId, attachmenturl)

  if (success)
  {
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({uploadUrl: url})
    }
  }
  return {
    statusCode: 404,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: ''
  }
}