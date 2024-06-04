//plugins {
//	java
//	id("org.springframework.boot") version "3.2.4"
//	id("io.spring.dependency-management") version "1.1.4"
//}
//
//group = "com.example"
//version = "0.0.1-SNAPSHOT"
//
//java {
//	sourceCompatibility = JavaVersion.VERSION_21
//}
//
//configurations {
//	compileOnly {
//		extendsFrom(configurations.annotationProcessor.get())
//	}
//}
//
//repositories {
//	mavenCentral()
//}
//
//dependencies {
//	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
//	implementation("org.springframework.boot:spring-boot-starter-security")
//	implementation("org.springframework.boot:spring-boot-starter-validation")
//	implementation("org.springframework.boot:spring-boot-starter-web")
//	compileOnly("org.projectlombok:lombok")
//	developmentOnly("org.springframework.boot:spring-boot-devtools")
//	runtimeOnly("com.mysql:mysql-connector-j")
//	annotationProcessor("org.projectlombok:lombok")
//	testImplementation("org.springframework.boot:spring-boot-starter-test")
//	testImplementation("org.springframework.security:spring-security-test")
//	testImplementation ("io.projectreactor:reactor-test")
//	implementation ("io.jsonwebtoken:jjwt-api:0.11.2")
//	runtimeOnly ("io.jsonwebtoken:jjwt-impl:0.11.2")
//	runtimeOnly ("io.jsonwebtoken:jjwt-jackson:0.11.2")
//	implementation ("net.logstash.logback:logstash-logback-encoder:7.1.1")
//	//implementation ("ch.qos.logback:logback-classic:1.2.11")
//	implementation ("org.springframework.boot:spring-boot-starter-web")
//	implementation ("org.springframework.boot:spring-boot-starter-webflux")
//	implementation ("org.springdoc:springdoc-openapi-ui:1.6.7")
//	implementation ("org.springframework.boot:spring-boot-starter-security")
//	implementation ("org.springframework.boot:spring-boot-starter-aop")
//	testImplementation ("org.springframework.security:spring-security-test")
////	implementation ("org.slf4j:slf4j-api:<version>")
////	implementation ("org.slf4j:slf4j-simple:<version")
//}
//
//
//tasks.withType<Test> {
//	useJUnitPlatform()
//}

plugins {
	java
	id("org.springframework.boot") version "3.2.4"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_21
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web")
	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	implementation("com.mysql:mysql-connector-j") // Ensure this is implementation, not runtimeOnly
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("io.projectreactor:reactor-test")
	implementation("io.jsonwebtoken:jjwt-api:0.11.2")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.2")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.2")
	implementation("net.logstash.logback:logstash-logback-encoder:7.1.1")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("org.springdoc:springdoc-openapi-ui:1.6.7")
	implementation("org.springframework.boot:spring-boot-starter-aop")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
