// Include
import * as Dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { AnyItem, Item } from 'dynamoose/dist/Item';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

dotenv.config();
const region = process.env.region;
const ddb = new Dynamoose.aws.ddb.DynamoDB({
  region,
});
Dynamoose.aws.ddb.set(ddb);

// Schema
const DemoSchema = new Dynamoose.Schema({
  uuid: { type: String, hashKey: true, required: true },
  sortkey: { type: String, rangeKey: true, required: true },
  demoName: {
    type: Set,
    schema: [String],
  },
});

const Demo = Dynamoose.model('zoomies-mock-api', DemoSchema);

// Controller
export const demoUpdate = async (body: any) => {
  const demoName: string = body.demoName;
  const uuid_ = body.uuid;
  let likedUser;
  let match = false;

  try {
    likedUser = await Demo.update(
      { uuid: uuid_, sortkey: 'asd2' },
      { $ADD: { demoName: `${demoName}` } }
    );
  } catch (err) {
    console.error(err);
  }
  return { match, likedUser };
};
// Router

const likeSomeone = async (
  event: APIGatewayProxyEvent,
  response: APIGatewayProxyResult
): Promise<APIGatewayProxyResult> => {
  try {
    const responseObject = await demoUpdate(event.body);
    console.log(responseObject);
    if (responseObject.likedUser != undefined) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          reponse: responseObject,
          successful: 'true',
        }),
      };
    }
  } catch (err) {
    response = {
      statusCode: 400,
      body: `${err}`,
    };
  }

  return response;
};

// Handler
export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult = {
    statusCode: 400,
    body: JSON.stringify({
      message: 'some error happened',
    }),
  };
  response = await likeSomeone(event, response);

  return response;
};
