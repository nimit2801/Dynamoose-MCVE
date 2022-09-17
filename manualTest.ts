import { lambdaHandler } from './app';
import { APIGatewayProxyResult } from 'aws-lambda';
import { userSchema } from './utils/userSchemaTest';

// Not a jest test but still failing to use the $ADD

async function funk() {
  const uuid = 'asd';
  const demoName = 'bear123';
  const new_ = new userSchema(
    'put',
    '/like',
    JSON.stringify({ uuid, demoName })
  ).event;
  const result: APIGatewayProxyResult = await lambdaHandler(new_);
  console.log(result);
}

funk();
