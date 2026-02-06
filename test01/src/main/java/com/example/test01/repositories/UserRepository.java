package com.example.test01.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.test01.models.User;


public interface UserRepository extends JpaRepository<User,Long>{
    // save,findAll,
     Optional<User> findByUsername(String username);
}
