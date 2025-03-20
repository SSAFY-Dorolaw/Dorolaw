package com.dorolaw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DorolawApplication {

    public static void main(String[] args) {
        SpringApplication.run(DorolawApplication.class, args);
    }

}
