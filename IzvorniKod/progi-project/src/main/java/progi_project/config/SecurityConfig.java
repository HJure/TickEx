package progi_project.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @SuppressWarnings({"removal"})
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(withDefaults()).csrf().disable()
            .authorizeHttpRequests(auth -> auth.requestMatchers("/", "/error", "users/register", "tickets/**", "users/**", "vrsta-dogadaja").permitAll()
                                    .anyRequest().authenticated()
                                    ).oauth2Login()
                                    .successHandler(customOAuth2SuccessHandler)
                                    .failureUrl("/login?error=true");

        return http.build();
    }

    // Define CORS configuration to allow requests from your React app
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);  // Allow cookies and authorization headers
        config.setAllowedOrigins(List.of("https://aplikacija.onrender.com"));  // React app URL
        config.setAllowedHeaders(List.of("*"));  // Allow all headers
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));  // Allowed methods

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);  // Apply CORS to all endpoints

        return new CorsFilter(source);
    }
}
