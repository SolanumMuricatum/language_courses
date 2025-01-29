package com.courses.backend.controller.backup;

import com.courses.backend.service.backup.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/backup")
@CrossOrigin
public class BackupController {

    private final BackupService backupService;

    @Autowired
    public BackupController(BackupService backupService) {
        this.backupService = backupService;
    }

    @PostMapping("/database")
    public ResponseEntity<String> backupDatabase() {
        try {
            backupService.backupDatabase();
            return ResponseEntity.ok("Backup of the database completed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error during database backup: " + e.getMessage());
        }
    }

   /* @PostMapping("/backup/files")
    public ResponseEntity<String> backupFiles() {
        try {
            backupService.backupFiles();
            return ResponseEntity.ok("Backup of the application files completed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error during file backup: " + e.getMessage());
        }
    }*/
}