package com.studenthealth.my_wellness_app.config;

import com.studenthealth.my_wellness_app.service.SeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SeedService seedService;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🌱 Seeding Database...");
        seedService.seedDatabase();
        System.out.println("✅ Database seeded successfully!");
    }
}
