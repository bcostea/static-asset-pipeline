package us.costea.assets.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

  @RequestMapping("/")
  public String index() {
    return "Hello world!";
  }

}
