package com.hcl.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hcl.model.Appointment;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {
    	
	@Query("Select a.timings from Appointment a where a.doctorname=?1 and a.date=?2 order by a.id")
	List<String> getAppointmentByDate(String name,String date);
	
	@Query("Select a from Appointment a where a.username=?1 order by a.id")
	List<Appointment> getAppointmentByUsername(String username);
	
	@Query("Select a from Appointment a where a.status=?1 order by a.id")
	List<Appointment> getAppointmentByStatus(String status);
	
}

