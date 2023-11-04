package com.project.backend;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.project.models.Blog;

import java.util.List;

import javax.sql.DataSource;

@RestController
@RequestMapping("/blog")
public class BlogController {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BlogController(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @PostMapping("/post")
    public String signUp(@RequestParam String username, 
                         @RequestParam String title, 
                         @RequestParam String content, 
                         @RequestParam String tags, 
                         @RequestParam String image) 
    {
    	
    		System.out.print(image);

        if (title.isEmpty()) {
            return "Title cannot be empty";
        }
        
        if (content.isEmpty()) {
            return "Content cannot be empty";
        }

        try {
        	byte[] imageBytes=Base64.decodeBase64(image);

            String sql = "INSERT INTO blogs (username, title, content, tags, image) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, username, title, content, tags, imageBytes);
            return "Blog Posted Successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred while trying to post. Please try again later";
        }
    }
    
    @GetMapping("/fetch")
    public ResponseEntity<?> getBlogById(@RequestParam int id) {
        try {
            String sql = "SELECT * FROM blogs WHERE id = ?";
            List<Blog> blog = jdbcTemplate.query(sql, new BlogRowMapper(), new Object[] { id });
            System.out.println(blog.get(0).getUsername());
            return ResponseEntity.ok(blog.get(0));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found for the given ID");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the blog");
        }
    }
    
    @GetMapping("/fetch/all")
    public ResponseEntity<?> getAllBlogs() {
        try {
            String sql = "SELECT * FROM blogs";
            List<Blog> blogs = jdbcTemplate.query(sql, new BlogRowMapper());
            return ResponseEntity.ok(blogs);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No blogs found");
        } catch (Exception e) {
        	System.out.print(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(e.toString());
        }
    }


}
