import os
import io
import boto3
import json
import csv
import base64
import struct

ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime = boto3.client('runtime.sagemaker')


def lambda_handler(event, context):
    print("Received event" + json.dumps(event, indent=2))

    data = json.loads(json.dumps(event))
    data = data["data"]
    data = json.dumps(data)

    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                       ContentType='application/json',
                                       Body=data)
    # return response
    result = json.loads(response['Body'].read().decode())
    return result
