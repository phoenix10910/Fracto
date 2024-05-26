package com.hcl.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.hcl.dto.Appointment;
import com.hcl.dto.Users;
import com.hcl.model.Admin;
import com.hcl.model.Doctor;
import com.hcl.service.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService aservice;
	
	static String name="";
	
	@Autowired
	private RestTemplate restTemplate;
	
	@PostMapping("/registerAdmin")
	public ResponseEntity<?> registerAdmin(@RequestBody Admin admin)
	{
		aservice.registerAdmin(admin);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/verifyAdmin/{username}")
	public ResponseEntity<?> verify(@PathVariable String username,@RequestBody Admin admin)
	{
		boolean check=aservice.verify(username,admin);
		if(check==true)
		{
			name=username;
			return ResponseEntity.ok().build();
		}
		else
		{
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logout()
	{
		name="";
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/addDoctor")
	public ResponseEntity<?> addDoctor(@RequestBody Doctor doc )
	{
		aservice.addDoctor(doc);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/displayDoctor")
	public List<Doctor> displayDoctor()
	{
		return aservice.getDoctor();
	}
	
	@DeleteMapping("/deleteDoctor/{name}")
	public ResponseEntity<?> deleteDoctor(@PathVariable String name)
	{
		aservice.deleteDoctor(name);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/updateDoctor/{name}")
	public ResponseEntity<?> updateDoctor(@PathVariable String name,@RequestBody Doctor doc)
	{
		aservice.updateDoctor(doc, name);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/deleteUser/{name}")
	public ResponseEntity<?> deleteUser(@PathVariable String name)
	{
		String uri="http://FRACTO-BACKEND-USER/user/deleteUser/"+name;
		restTemplate.delete(uri);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/deleteAppointment/{id}")
	public ResponseEntity<?> deleteAppointment(@PathVariable int id)
	{
		String uri="http://FRACTO-BACKEND-USER/user/deleteAppointment/"+id;
		restTemplate.delete(uri);
		return ResponseEntity.ok().build();
	}
	@PutMapping("/approveAppointment/{id}")
	public ResponseEntity<?> approveAppointment(@PathVariable int id)
	{
		String uri="http://FRACTO-BACKEND-USER/user/approveAppointment/"+id;
		restTemplate.put(uri,Appointment.class);
		return ResponseEntity.ok().build();
	}
	@GetMapping("/getAppointment")
	public List<Appointment> getAppointment()
	{
		String uri="http://FRACTO-BACKEND-USER/user/getAppointment";
		Appointment[] a = restTemplate.getForObject(uri, Appointment[].class);
		return Arrays.asList(a);
	}
	@GetMapping("/getAppointmentByStatus")
	public List<Appointment> getAppointmentByStatus()
	{
		String uri="http://FRACTO-BACKEND-USER/user/getAppointmentByStatus";
		Appointment[] a = restTemplate.getForObject(uri, Appointment[].class);
		return Arrays.asList(a);
	}
	@GetMapping("/displayUser")
	public List<Users> getUser()
	{
		String uri="http://FRACTO-BACKEND-USER/user/displayUser";
		Users[] u = restTemplate.getForObject(uri, Users[].class);
		return Arrays.asList(u);
	}
	
	@GetMapping("/getByDoctorIdLocationAndSpecialization/{city}/{specialization}")
	public List<Doctor> getDoctorIdByLocationAndSpecialization(@PathVariable String city,@PathVariable String specialization)
	{
		return aservice.getDoctorIdByCityAndSpecialization(city,specialization);	
	}
	@GetMapping("/getByDoctorIdLocationAndSpecializationRating/{city}/{specialization}")
	public List<Doctor> getDoctorIdByLocationAndSpecializationRating(@PathVariable String city,@PathVariable String specialization)
	{
		return aservice.getDoctorIdByCityAndSpecializationRating(city,specialization);	
	}
	@GetMapping("/getByDoctorIdLocation/{city}")
	public List<Doctor> getDoctorIdByLocation(@PathVariable String city)
	{
		return aservice.getDoctorIdByCity(city);	
	}
	@GetMapping("/getByDoctorIdLocationRating/{city}")
	public List<Doctor> getDoctorIdByLocationRating(@PathVariable String city)
	{
		return aservice.getDoctorIdByCityRating(city);	
	}
	@GetMapping("/getByDoctorIdRating")
	public List<Doctor> getDoctorIdRating()
	{
		return aservice.getDoctorIdRating();	
	}
}
