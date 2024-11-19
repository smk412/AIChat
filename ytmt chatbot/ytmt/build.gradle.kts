plugins {
	java
	id("org.springframework.boot") version "3.3.4"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(23)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
}

extra["springAiVersion"] = "1.0.0-M3"

dependencies {

	implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")
	//서블릿

	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-web-services")
	// Spring MVC와 Web Services(REST 및 SOAP) 개발을 위한 스타터들.

	implementation("org.springframework.ai:spring-ai-openai-spring-boot-starter")

	// Ollama AI 모델을 Spring Boot에 통합하기 위한 스타터.


	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")
	// OpenAPI 문서 생성을 위한 Springdoc 및 Swagger UI 스타터.

	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	// Lombok 라이브러리로 반복적인 코드 생성을 줄여주는 도구. 컴파일 시 사용.

	developmentOnly("org.springframework.boot:spring-boot-devtools")
	// 개발 중 생산성을 높이기 위한 DevTools. 핫스왑 및 자동 재시작 기능 제공.

	implementation("mysql:mysql-connector-java:8.0.33")
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")

	implementation("org.springframework.boot:spring-boot-starter-logging")

	implementation ("org.hibernate:hibernate-core:6.5.3.Final")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	// 테스트 환경을 위한 의존성들. JUnit과 Mockito를 포함.

	//JWT
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.ai:spring-ai-bom:${property("springAiVersion")}")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
