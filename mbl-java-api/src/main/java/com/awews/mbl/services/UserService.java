package com.awews.mbl.services;

import com.awews.mbl.domain.User;
import com.awews.mbl.exceptions.UsernameAlreadyExistsException;
import com.awews.mbl.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser (User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
//			Username has to be unique
			newUser.setUsername(newUser.getUsername());
//			pw and confirm  pw match
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);
		} catch(Exception e) {
			throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"'already exists");
		}
		
	}
	
	public User findByUsername(String username) {
		User user = userRepository.findByUsername(username);
		return user;
	}

}
