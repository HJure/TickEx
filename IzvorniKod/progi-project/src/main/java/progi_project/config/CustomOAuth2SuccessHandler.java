package progi_project.config;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import progi_project.service.UserService;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	
	@Value("${FRONTEND_URL:}")  
	private String FRONTEND_URL;

    @Autowired
    private UserService userService;

    @Value("${tickex.admin}")
    private String adminEmail;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        String email = (String) oauthUser.getAttribute("email");

        // Vrati OAuth2AuthorizedClient za access token
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
            oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());

        String accessToken = authorizedClient.getAccessToken().getTokenValue();
        
        List<String> deaktivirani = userService.getDeactivated();
        List<SimpleGrantedAuthority> authorities;
        
        if (email.equals(adminEmail)) {
            authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else if(!deaktivirani.contains(email)){
            authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        } else {
        	authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_UNREGISTERED"));
        }

        // ubaci role u token
        Authentication newAuth = new UsernamePasswordAuthenticationToken(oauthUser, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        String frontendUrl = request.getServerName().equals("localhost") ? "http://localhost:3000" : FRONTEND_URL;
        
        String redirectUrl;
        if (userService.emailExists(email)) {
            redirectUrl = frontendUrl + "/profile?access_token=" + accessToken;
        } else {
            redirectUrl = frontendUrl + "/register?email=" + email + "&access_token=" + accessToken;
        }
        
        response.sendRedirect(redirectUrl);
    }
}
