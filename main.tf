provider "aws" {
  region = "eu-west-3"
}

# 🔹 Créer un Security Group pour RDS
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Allow PostgreSQL access"
  vpc_id      = "vpc-0fc0b072eb8d63211"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # ⚠️ À restreindre pour plus de sécurité
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = "db.t3.micro"
  identifier             = "monprojet-db"
  username               = "dbuser" # Remplace "admin" par un autre nom
  password               = "SuperPassword123"
  publicly_accessible    = false
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
}


# 🔹 Output pour récupérer l'endpoint de la base
output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
