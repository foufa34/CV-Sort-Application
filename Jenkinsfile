pipeline {
  agent {
    docker {
      image 'cypress/browsers:node-18.12.0-chrome107-ff107'
    }
  }

  environment {
    PORT = '5173'
  }

  options {
    timeout(time: 10, unit: 'MINUTES')
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Start server') {
      steps {
        sh 'npm run preview &'
        sh 'npx wait-on http://localhost:5173'
      }
    }

    stage('Cypress tests') {
      steps {
        sh 'npx cypress run'
      }
    }
  }
}
