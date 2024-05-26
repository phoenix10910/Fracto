package com.hcl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.model.Admin;
import com.hcl.model.Doctor;
import com.hcl.repo.AdminRepo;
import com.hcl.repo.DoctorRepo;

@Service
public class AdminService {
	@Autowired
	private AdminRepo arepo;
	
	@Autowired
	private DoctorRepo drepo;
	
	public Admin registerAdmin(Admin admin)
	{
		return arepo.save(admin);
	}
	
	public Boolean verify(String username,Admin admin)
	{
		Admin a=arepo.findById(username).orElseThrow(RuntimeException::new);
		if(a.getPassword().equals(admin.getPassword()))
		{
			return true; 
		}
		else
		{
			return false;
		}
	}
	
	public Doctor addDoctor(Doctor doc)
	{
		return drepo.save(doc);
	}
	public List<Doctor> getDoctor()
	{
		return drepo.findAll();
	}
	public boolean deleteDoctor(String name)
	{
		Doctor d=drepo.findById(name).orElseThrow(RuntimeException::new);
		if(d!=null)
		{
			drepo.deleteById(name);
			return true;
		}
		else
		{
			return false;
		}
	}
	public Doctor updateDoctor(Doctor doc,String name)
	{
		drepo.deleteById(name);
		return drepo.save(doc);
	}
	
	public List<Doctor> getDoctorIdByCityAndSpecialization(String city,String specialization)
	{
		return drepo.getDoctorIdByCityAndSpecialization(city,specialization);
	}
	public List<Doctor> getDoctorIdByCityAndSpecializationRating(String city,String specialization)
	{
		return drepo.getDoctorIdByCityAndSpecializationRating(city,specialization);
	}
	public List<Doctor> getDoctorIdByCity(String city)
	{
		return drepo.getDoctorIdByCity(city);
	}
	public List<Doctor> getDoctorIdByCityRating(String city)
	{
		return drepo.getDoctorIdByCityRating(city);
	}
	public List<Doctor> getDoctorIdRating()
	{
		return drepo.getDoctorIdRating();
	}
}

