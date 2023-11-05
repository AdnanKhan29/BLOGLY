package com.project.models;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="comments")
public class Comment {
	
	private int id;
	private String username;
	private String comment;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	

}
