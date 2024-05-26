package com.hcl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.model.Appointment;
import com.hcl.repo.AppointmentRepo;

@Service
public class AppointmentService {
	
	@Autowired
	private AppointmentRepo repo;
	
	public List<String> getAppointmentByDate(String name,String date)
	{
		return repo.getAppointmentByDate(name, date);
	}
	public List<Appointment> getAppointment()
	{
		return repo.findAll();
	}
	public Appointment addAppointment(Appointment app)
	{
		return repo.save(app);
	}
	public List<Appointment> getAppointmentByUsername(String username)
	{
		return repo.getAppointmentByUsername(username);
	}
	public List<Appointment> getAppointmentByStatus(String status)
	{
		return repo.getAppointmentByStatus(status);
	}
	public void deleteAppointment(int id)
	{
		repo.deleteById(id);
	}
	public void approveAppointment(int id)
	{
		Appointment a=repo.findById(id).orElseThrow(RuntimeException::new);
		a.setId(a.getId());
		a.setUsername(a.getUsername());
		a.setDoctorname(a.getDoctorname());
		a.setDate(a.getDate());
		a.setTimings(a.getTimings());
		a.setStatus("Yes");
		repo.deleteById(id);
		repo.save(a);
	}
}
