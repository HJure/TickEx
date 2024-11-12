package progi_project.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

    @Autowired
    private UserService userService;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        String email = (String) oauthUser.getAttribute("email");

        // Retrieve the OAuth2AuthorizedClient to get the access token
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
            oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());

        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        if (userService.emailExists(email)) {
            // If email exists in db then users account exists, redirect to frontend homepage with the access token
            response.sendRedirect("https://frontend-k90t.onrender.com/profile?access_token=" + accessToken);
        } else {
            // Else user does not exist, redirect to frontend registration page
            response.sendRedirect("https://frontend-k90t.onrender.com/register?email=" + email + "&access_token=" + accessToken);
        }
    }
}
