package com.example.test01.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.test01.models.User;

public interface UserRepository extends JpaRepository<User,Long>{
    // save,findAll,
}
