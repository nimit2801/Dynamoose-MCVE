import { APIGatewayProxyEvent } from 'aws-lambda';

export class userSchema {
  event: APIGatewayProxyEvent;
  queryStringParameters: APIGatewayProxyEvent['queryStringParameters'];
  constructor(
    httpMethod: APIGatewayProxyEvent['httpMethod'],
    path: APIGatewayProxyEvent['path'],
    body?: APIGatewayProxyEvent['body'],
    queryStringParameters?: APIGatewayProxyEvent['queryStringParameters']
  ) {
    this.queryStringParameters = queryStringParameters!;
    this.event = {
      httpMethod: httpMethod,
      body: body || '',
      headers: {},
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: path,
      pathParameters: {},
      queryStringParameters: queryStringParameters!,
      requestContext: {
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        httpMethod: httpMethod,
        identity: {
          accessKey: '',
          accountId: '',
          apiKey: '',
          apiKeyId: '',
          caller: '',
          clientCert: {
            clientCertPem: '',
            issuerDN: '',
            serialNumber: '',
            subjectDN: '',
            validity: { notAfter: '', notBefore: '' },
          },
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: '',
          cognitoIdentityPoolId: '',
          principalOrgId: '',
          sourceIp: '',
          user: '',
          userAgent: '',
          userArn: '',
        },
        path: path,
        protocol: 'HTTP/1.1',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        resourceId: '123456',
        resourcePath: path,
        stage: 'dev',
      },
      resource: '',
      stageVariables: {},
    };
  }
}
