pipeline {
  agent {label 'docker-node'}
   
  }

  environment {
    NODE_ENV = 'test'
  }
   stages{
    stage('Run inside docker')
    {
      steps{
      sh 'docker run --rm -v $PWD:/app -w /app node:18 npm install'
      sh 'docker run --rm -v $PWD:/app -w /app node:18 npm run build'
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

