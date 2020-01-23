import com.moowork.gradle.node.yarn.YarnTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	kotlin("plugin.jpa") version "1.3.61"
	id("org.springframework.boot") version "2.2.4.RELEASE"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	//id("com.moowork.node") version "1.3.1"
	id("com.github.node-gradle.node") version "2.2.0"
	kotlin("jvm") version "1.3.61"
	kotlin("plugin.spring") version "1.3.61"
}

group = "com.github.krix38"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-data-rest")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	runtimeOnly("com.h2database:h2")
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}
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



// Task for installing frontend dependencies in web
val installDependencies by tasks.registering(YarnTask::class) {
	args = listOf("install")
	setExecOverrides(closureOf<ExecSpec> {
		setWorkingDir("${project.projectDir}/frontend")
	})
}

// Task for executing build:gradle in web
val buildWeb by tasks.registering(YarnTask::class) {
	// Before buildWeb can run, installDependencies must run
	dependsOn(installDependencies)

	args = listOf("build")
	setExecOverrides(closureOf<ExecSpec> {
		setWorkingDir("${project.projectDir}/frontend")
	})
}

tasks.register<Copy>("copyFrontendBundle") {
	dependsOn(buildWeb)
	from(file("${project.projectDir}/frontend/build"))
	into(file("${project.projectDir}/src/main/resources/public"))
}

// Before build can run, buildWeb must run
tasks.build {
	dependsOn("copyFrontendBundle")
}
