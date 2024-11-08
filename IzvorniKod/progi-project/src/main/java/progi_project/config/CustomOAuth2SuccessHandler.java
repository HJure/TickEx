package progi_project.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import progi_project.service.UserService;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();
        
        String email = (String) oauthUser.getAttribute("email");
        String accessToken = oauthUser.getAttribute("access_token");

        if (userService.emailExists(email)) {
            // If email exists in db then users account exists, redirect to frontend homepage with the access token
            response.sendRedirect("http://localhost:3000/?access_token=" + accessToken);
        } else {
            // Else user does not exist, redirect to frontend registration page
            response.sendRedirect("http://localhost:3000/register?email=" + email + "&access_token=" + accessToken);
        }
    }
}
