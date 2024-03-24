# Web Application Docker Deployment

This guide will help you set up, run, and test the web application locally using Docker.

## Prerequisites

- Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

## Setup

1. Clone this repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Ensure your Flask application is properly configured.

3. Create a `requirements.txt` file listing all Python dependencies if not already present.

4. Build the Docker image:

   ```bash
   docker-compose build
   ```

## Running the Application

To run the web application, execute the following command:

```bash
docker-compose up
```
