import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getUserId} from '../utils'
import { getUserTodoItems } from '../../buisnessLogic/todo'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
{
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event);
  const todos = await getUserTodoItems(userId)

  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({items: todos})
  }

}
