package progi_project.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Value("${FRONTEND_URL:}")  
	private String FRONTEND_URL;

    @Autowired
    private CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @SuppressWarnings({"removal"})
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(withDefaults()).csrf().disable()
            .authorizeHttpRequests(auth -> auth.requestMatchers("/shop/**","/", "/error", "/users/register", 
            	"/tickets/**", "/users/**", "/vrsta-dogadaja", "/exchanges/**", "/sales/**", "/reports", 
            	"/auctions/**","/favorites/**","/chain/**","/savePreferences/**", "/recommended/**").permitAll().requestMatchers("/reports/dashboard").hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated())
                .oauth2Login()
                .successHandler(customOAuth2SuccessHandler)
                .failureUrl("/login?error=true");

        return http.build();
    }


    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); 
        config.setAllowedOrigins(List.of(FRONTEND_URL, "http://localhost:3000"));  
        config.setAllowedHeaders(List.of("*"));  
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);  

        return new CorsFilter(source);
    }
}
