resource "aws_dynamodb_table" "last_synced_block_v1" {
  name         = "piedefi-last-synced-block-v1"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "partition"
  range_key    = "blockNumber"

  attribute {
    name = "partition"
    type = "S"
  }

  attribute {
    name = "blockNumber"
    type = "N"
  }

  provider = aws.eu-west-2
}

resource "aws_dynamodb_table" "positions_account_v1" {
  name         = "piedefi-positions-from-v1"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "account"
  range_key    = "timestampSeconds"

  attribute {
    name = "account"
    type = "S"
  }

  attribute {
    name = "timestampSeconds"
    type = "N"
  }

  provider = aws.eu-west-2
}

