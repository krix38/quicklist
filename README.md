# quicklist

Shopping list app written in kotlin and typescript

## Build

Use your os specific wrapper script, e.g on mac just type `./gradlew clean build`

## Running

Simply `java -jar build/libs/quicklist-0.0.1-SNAPSHOT.jar`
By default app will start on localhost:8080 with in memory h2 enabled. You can connect quicklist to postgres by toggling `postgres` spring profile (and setting spring datasource env vars)
