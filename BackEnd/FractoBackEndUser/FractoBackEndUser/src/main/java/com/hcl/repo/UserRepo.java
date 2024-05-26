package com.hcl.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.hcl.model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, String> {

}

