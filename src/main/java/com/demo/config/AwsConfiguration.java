
package com.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.services.textract.AmazonTextract;
import com.amazonaws.services.textract.AmazonTextractClientBuilder;

@Configuration
public class AwsConfiguration {

    @Bean
    public AmazonTextract amazonTextractClient() {
        return AmazonTextractClientBuilder.standard()
                .withRegion("us-east-1")
                .build();
    }
}
