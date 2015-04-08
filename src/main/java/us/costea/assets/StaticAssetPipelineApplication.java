package us.costea.assets;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("us.costea.assets.controllers")
public class StaticAssetPipelineApplication {

  public static void main(String[] args) {
    ApplicationContext ctx = SpringApplication.run(StaticAssetPipelineApplication.class, args);
  }

}
