pipeline {
  agent any
   
  options{
    timeout(time: 10, unit: 'MINUTES') {
     
  }

  environment {
    NODE_ENV = 'test'
  }
  
}
   stages{
    stage('Checkout') {
      steps {
        checkout scm
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

