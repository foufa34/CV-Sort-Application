pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }

  stages {

    stage('Checkout') {
      steps {
           git url: 'https://github.com/foufa34/CV-Sort-Application.git', credentialsId: 'zf2025'
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

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        echo 'Déploiement ici (ex: Docker, SCP, Kubernetes, etc.)'
        // Exemple :
        // sh './deploy.sh'
      }
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
