package com.project.backend;

import com.project.models.User;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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
    public String signUp( @RequestParam String email, @RequestParam String username, @RequestParam String password, @RequestParam String confirmpass) {
        
    	if (!password.equals(confirmpass)) {
            return "Passwords do not match. Please try again.";
        }
    	
    	if(password=="") {
    		return "Password Cannot Be Empty";
    	}
    	
    	if(email=="") {
    		return "Email Cannot Be Empty";
    	}
    	
    	if(username=="") {
    		return "Username Cannot Be Empty";
    	}
    	
    	if(password.length()<5) {
    		return "Password Length Must Be At Least 5 Characters";
    	}

        try {
            String sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
            int result = jdbcTemplate.update(sql, username, password, email);
            return result > 0 ? "User signed up successfully:"+username+":"+email : "Sign up failed";
        } catch (DataIntegrityViolationException e) {
            return "Username already exists. Please choose a different username.";
        } catch (Exception e) {
            return "An error occurred while signing up. Please try again later.";
        }
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {

    	String username = user.getUsername();
    	String password = user.getPassword();
    	System.out.println(username);

    			
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        java.util.List<User> users = jdbcTemplate.query(sql, new UserRowMapper(),new Object[]{username, password});

        if (!(users).isEmpty()) {
            return "Login Successful:"+users.get(0).getUsername()+":"+users.get(0).getEmail();
        } else {
            return "Invalid Credentials";
        }
    }
    

    @GetMapping("/allusers")
    public String getAllUsers() {
        String sql = "SELECT * FROM users";
        java.util.List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
        StringBuilder result = new StringBuilder();
        for (User user : users) {
            result.append("Username: ").append(user.getUsername()).append(", ");
            result.append("Password: ").append(user.getPassword()).append(", ");
            result.append("Email: ").append(user.getEmail()).append("\n");
            result.append("<br>");
        }
        return result.toString();
    }



    
}
