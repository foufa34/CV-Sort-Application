pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }
   Stages{
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
        echo 'Déploying application ...'
        // sh './deploy_script.sh'
      }
    }
  }
  post {
    always {
     echo 'Pipeline Finished.'
    }
  }
}

