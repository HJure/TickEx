package progi_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Application {

	public static void main(String[] args) {
		System.out.println("DB_URL: " + System.getenv("DB_URL"));
        	System.out.println("DB_USERNAME: " + System.getenv("DB_USERNAME"));
        	System.out.println("DB_PASSWORD: " + System.getenv("DB_PASSWORD"));
		System.out.println("FRONTEND_URL: " + System.getenv("FRONTEND_URL"));
		System.out.println("BACKEND_URL: " + System.getenv("BACKEND_URL"));
		System.out.println("password: " + System.getenv("password"));
		SpringApplication.run(Application.class, args);
	}

}
