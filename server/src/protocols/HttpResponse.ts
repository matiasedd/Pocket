interface HttpResponse {
  statusCode: number
  body: any
}

interface ErrorHttpResponse {
  statusCode: number
  body: {
    message: string
  }
}

export { HttpResponse, ErrorHttpResponse };
