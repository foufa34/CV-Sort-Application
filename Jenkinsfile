pipeline {
  agent {
    docker {
      image 'node:18'
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

    stage('Start server and run Cypress tests') {
      steps {
        sh '''
          npm run preview &  # start server
          SERVER_PID=$!
          npx wait-on http://localhost:5173
          npx cypress run
          kill $SERVER_PID
        '''
      }
    }
  }
}
