package com.hcl.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hcl.model.Doctor;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, String> {
    
	@Query("select d from Doctor d where d.city=?1 and d.specialization=?2")
    List<Doctor> getDoctorIdByCityAndSpecialization(String city, String specialization);
	
	@Query("select d from Doctor d where d.city=?1 and d.specialization=?2 order by d.rating desc")
    List<Doctor> getDoctorIdByCityAndSpecializationRating(String city, String specialization);
	
	@Query("select d from Doctor d where d.city=?1")
    List<Doctor> getDoctorIdByCity(String city);
	
	@Query("select d from Doctor d where d.city=?1 order by d.rating desc")
    List<Doctor> getDoctorIdByCityRating(String city);
	
	@Query("select d from Doctor d order by d.rating desc")
    List<Doctor> getDoctorIdRating();

}

