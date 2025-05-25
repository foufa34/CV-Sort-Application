pipeline {
  agent any

  options {
    timeout(time: 10, unit: 'MINUTES')
  }

  environment {
    PORT = '5173'
  }

  stages {
    stage('Setup Node.js') {
      steps {
        // Installe Node.js via nvm (ou utilise une image Docker, cf plus bas)
        sh '''
          curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
          apt-get install -y nodejs
          node -v
          npm -v
        '''
      }
    }

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

    stage('Start preview server') {
      steps {
        sh 'npm run preview &'
        sh 'npx wait-on http://localhost:5173'
      }
    }

    stage('Run Cypress tests') {
      steps {
        sh 'npx cypress run'
      }
    }
  }
}

