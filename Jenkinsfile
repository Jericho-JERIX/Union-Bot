pipeline {
    agent any
    environment {
        ENV_FILE=credentials('union-env')
        PORT=8011
        IMAGE_NAME='union-bot'
        CONTAINER_NAME='union-bot-container'
    }
    stages {
        stage('Setup Environment') {
            steps {
                sh '''
                cp $ENV_FILE .env
                '''
            }
        }
        stage('Build Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:latest .
                '''
            }
        }
        stage('Run Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true
                docker run -d --name $CONTAINER_NAME -p $PORT:3000 $IMAGE_NAME:latest
                '''
            }
        }
    }
}
