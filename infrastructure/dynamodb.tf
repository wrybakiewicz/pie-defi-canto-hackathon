resource "aws_dynamodb_table" "this" {
  name         = "piedefi"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "hash"
  range_key    = "range"

  attribute {
    name = "hash"
    type = "S"
  }

  attribute {
    name = "range"
    type = "S"
  }

  provider = aws.eu-west-2
}
