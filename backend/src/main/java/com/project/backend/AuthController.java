package com.project.backend;

import com.project.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AuthController(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        try 
        {
            String sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            int result = jdbcTemplate.update(sql, user.getUsername(), user.getPassword());
            return result > 0 ? "User signed up successfully" : "Sign up failed";
        } 
        catch (DataIntegrityViolationException e) 
        {
            return "Username already exists. Please choose a different username.";
        }
        catch (Exception e) 
        {
            return "An error occurred while signing up. Please try again later.";
        }
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        User user = null;
//        User user = jdbcTemplate.queryForObject(sql, new Object[]{username, password}, (rs, rowNum) -> {
//            User u = new User();
//            u.setUsername(rs.getString("username"));
//            u.setPassword(rs.getString("password"));
//            return u;
//        });

        if (user != null && user.getPassword().equals(password)) {
            return "Login Successful";
        } else {
            return "Login Failed";
        }
    }
}
