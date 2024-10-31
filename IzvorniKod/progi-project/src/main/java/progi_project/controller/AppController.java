package progi_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.User;
import progi_project.service.UserService;

@RestController
@RequestMapping("/tickex")
public class AppController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public String app(OAuth2AuthenticationToken oAuth2AuthenticationToken){
        String email = (String) oAuth2AuthenticationToken.getPrincipal().getAttribute("email");
        String name = (String) oAuth2AuthenticationToken.getPrincipal().getAttribute("name");

        if(userService.emailExists(email)) {
            // User has account

            return "Welcome back, " + name;
        }
        else {
            // User don't have account
            // Create new user and insert user in database

            userService.registerUser(new User(email));

            return "You are successfully registered. Welcome to TickEx, " + name;
        }  
    }
}