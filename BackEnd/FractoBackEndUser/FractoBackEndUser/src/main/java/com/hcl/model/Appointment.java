package com.hcl.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String username;

	private String doctorname;

	private String date;

	private String timings;
	
	private String status;

	public Appointment(String username, String doctorname, String date, String timings,
			 String status) {
		super();
		this.username = username;
		this.doctorname = doctorname;
		this.date = date;
		this.timings = timings;
		this.status = status;
	}

}
