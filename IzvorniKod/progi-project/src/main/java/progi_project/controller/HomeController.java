package progi_project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "Hello, this is homepage";
    }

    @GetMapping("/secured")
    public String secured(){
        return "Hello, you are in app";
    }
}
