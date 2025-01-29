package com.courses.backend.service.backup;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class BackupService {

    @Value("${backup.script.path}")
    private String backupScriptPath;

    /*@Value("${file.backup.script.path}")
    private String fileBackupScriptPath;*/

    public void backupDatabase() throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", backupScriptPath);
        processBuilder.inheritIO(); // Это позволит видеть вывод скрипта в консоли
        Process process = processBuilder.start();
        process.waitFor();
    }

    //!!!!
    /*pg_restore -U postgres -d your_database_name -v "path_to_your_backup_file"*/

  /*  public void backupFiles() throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(fileBackupScriptPath);
        Process process = processBuilder.start();
        process.waitFor();
    }*/
}