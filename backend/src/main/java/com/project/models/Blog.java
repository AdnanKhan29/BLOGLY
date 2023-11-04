package com.project.models;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="blogs")
public class Blog {
	
    private String username;
    private String title;
    private String content;
    
	public Blog(String username, String title, String content) {
		this.username = username;
		this.title = title;
		this.content = content;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
    
    

}
