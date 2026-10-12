package br.com.shieldpme.api.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DatabaseTestController {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseTestController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/test/database")
    public Map<String, Object> testDatabase() {
        return jdbcTemplate.queryForMap("""
            SELECT
                DB_NAME() AS databaseName,
                1 AS connectionTest
            """);
    }
}





