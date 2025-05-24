pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }

  stages {

    stage('Checkout') {
      steps {
        git url: 'https://votre-repo.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'npm run test:unit'
      }
    }

    stage('Integration Tests') {
      steps {
        sh 'npm run test:integration'
      }
    }

    stage('E2E Tests') {
      steps {
        sh 'npm run test:e2e'
      }
    }

  post {
    always {
      junit 'reports/**/*.xml'
    }
    success {
      echo 'Build et tests réussis !'
    }
    failure {
      echo 'Erreur dans le pipeline.'
    }
  }
}
