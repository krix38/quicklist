import com.moowork.gradle.node.yarn.YarnTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.6"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("com.github.node-gradle.node") version "2.2.0"
	kotlin("jvm") version "1.5.31"
	kotlin("plugin.spring") version "1.5.31"
    kotlin("plugin.jpa") version "1.3.61"
}

group = "com.github.krix38"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    implementation("org.springframework.boot:spring-boot-starter-data-rest") {
        exclude(group = "org.springframework.boot", module = "spring-boot-starter-tomcat")
    }
    implementation("org.springframework.boot:spring-boot-starter-jetty")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("de.flapdoodle.embed:de.flapdoodle.embed.mongo")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
node {
    // Version of node to use.
    version = "12.14.1"

    // Version of npm to use.
    npmVersion = "6.13.4"

    // Version of Yarn to use.
    yarnVersion = "1.21.1"

    // Set the work directory for Yarn
    yarnWorkDir = file("${project.projectDir}/frontend")

    // Base URL for fetching node distributions (change if you have a mirror).
    distBaseUrl = "https://nodejs.org/dist"

    // If true, it will download node using above parameters.
    // If false, it will try to use globally installed node.
    download = true

    // Set the work directory for NPM
    npmWorkDir = file("${project.projectDir}/frontend")

    // Set the work directory where node_modules should be located
    nodeModulesDir = file("${project.projectDir}/frontend")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

val installDependencies by tasks.registering(YarnTask::class) {
    args = listOf("install")
    setExecOverrides(closureOf<ExecSpec> {
        setWorkingDir("${project.projectDir}/frontend")
    })
}

val buildWeb by tasks.registering(YarnTask::class) {
    dependsOn(installDependencies)

    args = listOf("build")
    setExecOverrides(closureOf<ExecSpec> {
        setWorkingDir("${project.projectDir}/frontend")
    })
}

tasks.processResources {
    dependsOn(buildWeb)
    from ("frontend/build/") {
        into ("public")
    }
}