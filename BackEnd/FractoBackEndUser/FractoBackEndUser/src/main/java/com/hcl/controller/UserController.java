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

import com.hcl.dto.Doctor;
import com.hcl.model.Appointment;
import com.hcl.model.Users;
import com.hcl.service.AppointmentService;
import com.hcl.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService uservice;
	
	@Autowired
	private AppointmentService aservice;
	
	@Autowired
	private RestTemplate restTemplate;
	
	static String name="";
	static int i=4;
	
	@PostMapping("/registerUser")
	public ResponseEntity<?> registerAdmin(@RequestBody Users user)
	{
		uservice.registerUser(user);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/verifyUser/{username}")
	public ResponseEntity<?> verify(@PathVariable String username,@RequestBody Users user)
	{
		boolean check=uservice.verify(username,user);
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
	
	@DeleteMapping("/deleteUser/{name}")
	public void deleteUser(@PathVariable String name)
	{
		uservice.deleteUser(name);
	}
	
	@GetMapping("/displayUser")
	public List<Users> getUser()
	{
		return uservice.getUser();
	}
	
	@GetMapping("/getDoctorsByLocationAndSpecs/{city}/{spec}")
	public List<Doctor> getDoctorsByLocationAndSpecs(@PathVariable String city,@PathVariable String spec)
	{
		String uri="http://FRACTO-BACKEND-ADMIN/admin/getByDoctorIdLocationAndSpecialization/"+city+"/"+spec;
		Doctor[] doc=restTemplate.getForObject(uri, Doctor[].class);
		return Arrays.asList(doc);
	}
	@GetMapping("/getDoctorsByLocationAndSpecsRating/{city}/{spec}")
	public List<Doctor> getDoctorsByLocationAndSpecsRating(@PathVariable String city,@PathVariable String spec)
	{
		String uri="http://FRACTO-BACKEND-ADMIN/admin/getByDoctorIdLocationAndSpecializationRating/"+city+"/"+spec;
		Doctor[] doc=restTemplate.getForObject(uri, Doctor[].class);
		return Arrays.asList(doc);
	}
	@GetMapping("/getDoctorsByLocation/{city}")
	public List<Doctor> getDoctorsByLocation(@PathVariable String city)
	{
		String uri="http://FRACTO-BACKEND-ADMIN/admin/getByDoctorIdLocation/"+city;
		Doctor[] doc=restTemplate.getForObject(uri, Doctor[].class);
		return Arrays.asList(doc);
	}
	@GetMapping("/getDoctorsByLocationRating/{city}")
	public List<Doctor> getDoctorsByLocationRating(@PathVariable String city)
	{
		String uri="http://FRACTO-BACKEND-ADMIN/admin/getByDoctorIdLocationRating/"+city;
		Doctor[] doc=restTemplate.getForObject(uri, Doctor[].class);
		return Arrays.asList(doc);
	}
	@GetMapping("/displayDoctors")
	public List<Doctor> getDoctors()
	{
		String uri="http://FRACTO-BACKEND-ADMIN/admin/displayDoctor";
		Doctor[] doc=restTemplate.getForObject(uri, Doctor[].class);
		return Arrays.asList(doc);
	}
	@GetMapping("/getDoctorsRating")
	public List<Doctor> getDoctorsRating()
	{
		String uri="http://FRACTO-BACKEND-ADMIN/admin/getByDoctorIdRating";
		Doctor[] doc=restTemplate.getForObject(uri, Doctor[].class);
		return Arrays.asList(doc);
	}
	
	@PostMapping("/addAppointment")
	public ResponseEntity<?> addAppointment(@RequestBody Appointment app)
	{
		app.setId(i);
		app.setUsername(name);
		app.setStatus("Pending");
		aservice.addAppointment(app);
		return ResponseEntity.ok().build();
	}
		
	@GetMapping("/getAppointment")
	public List<Appointment> getAppointment()
	{
		return aservice.getAppointment();
	}
	@GetMapping("/getAppointment/{name}/{date}")
	public List<String> getAppointment(@PathVariable String name,@PathVariable String date)
	{
		return aservice.getAppointmentByDate(name, date);
	}
	
	@GetMapping("/getAppointmentByUsername")
	public List<Appointment> getAppointmentByUsername()
	{
		return aservice.getAppointmentByUsername(name);
	}
	@GetMapping("/getAppointmentByStatus")
	public List<Appointment> getAppointmentByStatus()
	{
		return aservice.getAppointmentByStatus("Pending");
	}
	@DeleteMapping("/deleteAppointment/{id}")
	public ResponseEntity<?> deleteAppointment(@PathVariable int id)
	{
		aservice.deleteAppointment(id);
		return ResponseEntity.ok().build();
	}
	@PutMapping("/approveAppointment/{id}")
	public ResponseEntity<?> approveAppointment(@PathVariable int id)
	{
		aservice.approveAppointment(id);
		return ResponseEntity.ok().build();
	}
}
