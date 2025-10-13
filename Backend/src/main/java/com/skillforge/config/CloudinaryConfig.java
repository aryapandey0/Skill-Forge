package com.skillforge.config;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", System.getProperty("cloudinary.cloud_name", "dj4ibwgli"),
                "api_key", System.getProperty("cloudinary.api_key", "277258662115317"),
                "api_secret", System.getProperty("cloudinary.api_secret", "3ELPUpqneJZiFrFCHxqqHXr3XuQ")
        ));
    }
}