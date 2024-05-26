package com.hcl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hcl.model.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String> {

}
