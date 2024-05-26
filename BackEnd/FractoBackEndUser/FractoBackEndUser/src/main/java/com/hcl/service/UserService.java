package com.hcl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.model.Users;
import com.hcl.repo.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo repo;
	
	public Users registerUser(Users user)
	{
		return repo.save(user);
	}
	
	public Boolean verify(String username,Users user)
	{
		Users u=repo.findById(username).orElseThrow(RuntimeException::new);
		if(u.getPassword().equals(user.getPassword()))
		{
			return true; 
		}
		else
		{
			return false;
		}
	}
	
	public boolean deleteUser(String name)
	{
		if(repo.findById(name)==null)
		{
			return false;
		}
		else
		{
			repo.deleteById(name);
			return true;
		}
	}
	
	public List<Users> getUser()
	{
		return repo.findAll();
	}
	
}
