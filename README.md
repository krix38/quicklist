# quicklist

Shopping list app written in kotlin and typescript

## Build

Use your os specific wrapper script, e.g on mac just type `./gradlew clean build`

## Running

Simply `java -jar build/libs/quicklist-0.0.1-SNAPSHOT.jar`
By default app will start on localhost:8080 with embedded mongo enabled. You can connect quicklist to existing mongodb by toggling `prod` spring profile and setting MONGODB_URI environment variable
