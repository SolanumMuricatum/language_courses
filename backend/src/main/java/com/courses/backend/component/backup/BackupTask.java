package com.courses.backend.component.backup;

import com.courses.backend.service.backup.BackupService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class BackupTask {

    @Autowired
    private BackupService backupService;

    @PostConstruct
    public void init() {
        performBackup(); // Выполнить резервное копирование сразу при старте приложения
    }

    @Scheduled(fixedRate = 3600000) // Каждые 3600000 миллисекунд (1 час)
    public void performBackup() {
        try {
            backupService.backupDatabase();
          //  backupService.backupFiles();
            System.out.println("Backup completed successfully.");
        } catch (Exception e) {
            System.err.println("Error during backup: " + e.getMessage());
        }
    }
}